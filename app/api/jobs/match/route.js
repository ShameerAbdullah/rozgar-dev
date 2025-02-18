import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Job from '@/models/Job';

// Helper function to calculate similarity between two strings
function stringSimilarity(str1, str2) {
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();
    return s1.includes(s2) || s2.includes(s1);
}

// Helper function to calculate skill match score
function calculateSkillMatch(jobSkills, candidateSkills) {
    if (!jobSkills.length || !candidateSkills.length) return 0;
    
    const matches = jobSkills.reduce((acc, skill) => {
        if (candidateSkills.some(candidateSkill => 
            stringSimilarity(candidateSkill, skill)
        )) {
            return acc + 1;
        }
        return acc;
    }, 0);
    
    return (matches / jobSkills.length) * 100;
}

// Helper function to calculate keyword/tag match score
function calculateKeywordMatch(jobTags, keywords) {
    if (!jobTags.length || !keywords.length) return 0;
    
    const matches = jobTags.reduce((acc, tag) => {
        if (keywords.some(keyword => 
            stringSimilarity(keyword, tag)
        )) {
            return acc + 1;
        }
        return acc;
    }, 0);
    
    return (matches / jobTags.length) * 100;
}

// Helper function to calculate experience match score
function calculateExperienceMatch(jobMinExp, jobMaxExp, candidateExp) {
    if (jobMinExp === 0 && jobMaxExp === 0) return 100; // No experience required
    if (candidateExp >= jobMinExp) {
        if (jobMaxExp === 0 || candidateExp <= jobMaxExp) {
            return 100; // Perfect experience match
        }
        // Candidate is overqualified but still considered
        return 70;
    }
    // Candidate is underqualified but might be considered
    const expRatio = (candidateExp / jobMinExp) * 100;
    return Math.min(expRatio, 50); // Cap at 50% for underqualified
}

// Helper function to calculate education match score
function calculateEducationMatch(jobQualifications, candidateEducation) {
    if (!jobQualifications || !candidateEducation) return 0;
    
    const educationLevels = {
        'phd': 5,
        'doctorate': 5,
        'masters': 4,
        'bachelor': 3,
        'undergraduate': 3,
        'diploma': 2,
        'certificate': 1
    };
    
    const jobEduLevel = Object.entries(educationLevels).reduce((highest, [level, value]) => {
        if (jobQualifications.toLowerCase().includes(level)) {
            return Math.max(highest, value);
        }
        return highest;
    }, 0);
    
    const candidateEduLevel = Object.entries(educationLevels).reduce((highest, [level, value]) => {
        if (candidateEducation.toLowerCase().includes(level)) {
            return Math.max(highest, value);
        }
        return highest;
    }, 0);
    
    if (candidateEduLevel >= jobEduLevel) {
        return 100;
    }
    return (candidateEduLevel / jobEduLevel) * 70; // Partial match for lower education
}

export async function POST(req) {
    try {
        await connectDB();
        const { skills = [], education = '', experience = 0, keywords = [] } = await req.json();

        // Get all active jobs
        const jobs = await Job.find({ status: 'active' });

        // Score and sort jobs based on matching criteria
        const scoredJobs = jobs.map(job => {
            // 1. Skills Match (40% weight)
            const skillsMatchScore = calculateSkillMatch(job.required_skills, skills);
            
            // 2. Keywords/Tags Match (25% weight)
            const keywordMatchScore = calculateKeywordMatch(job.tags, keywords);
            
            // 3. Experience Match (20% weight)
            const experienceMatchScore = calculateExperienceMatch(
                job.min_exp_in_years,
                job.max_exp_in_years,
                experience
            );
            
            // 4. Education Match (15% weight)
            const educationMatchScore = calculateEducationMatch(
                job.qualifications,
                education
            );

            // Calculate weighted total score
            const totalScore = (
                (skillsMatchScore * 0.40) +
                (keywordMatchScore * 0.25) +
                (experienceMatchScore * 0.20) +
                (educationMatchScore * 0.15)
            );

            return {
                ...job.toObject(),
                matchScore: Math.round(totalScore),
                matchDetails: {
                    skillsMatch: Math.round(skillsMatchScore),
                    keywordMatch: Math.round(keywordMatchScore),
                    experienceMatch: Math.round(experienceMatchScore),
                    educationMatch: Math.round(educationMatchScore)
                }
            };
        });

        // Filter jobs with at least 20% match and sort by match score
        const filteredJobs = scoredJobs
            .filter(job => job.matchScore >= 20)
            .sort((a, b) => b.matchScore - a.matchScore);

        return NextResponse.json({
            success: true,
            data: filteredJobs
        });

    } catch (error) {
        console.error('Error matching jobs:', error);
        return NextResponse.json(
            { error: "Failed to match jobs" },
            { status: 500 }
        );
    }
}
