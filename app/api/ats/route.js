import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getAtsScore(resumeContent) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `
                        You are an assistant that reviews resumes/CVs and extracts key information for job matching.
                        Analyze the resume and provide:
                        1. An ATS (Applicant Tracking System) score out of 100
                        2. Suggestions for improvement if score is below 85
                        3. List of skills found in the resume
                        4. Education level/qualifications
                        5. Years of experience
                        6. Important keywords/terms from the resume

                        Please return the output in the following json format:
                        {
                            "score": <number 0-100>,
                            "suggestions": <string with suggestions or "Your resume meets ATS standards" if score >= 85>,
                            "skills": <array of skill strings>,
                            "education": <string describing highest education level>,
                            "experience": <number of years of experience>,
                            "keywords": <array of important keywords from resume>
                        }

                        Resume: 
                        ${resumeContent}
                    `,
                },
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
        });

        const atsResult = completion.choices[0]?.message?.content;
        if (!atsResult) {
            throw new Error('No ATS analysis returned from the model.');
        }

        console.log("Raw ATS result:", atsResult);
        return JSON.parse(atsResult);
    } catch (error) {
        console.error('Error processing ATS request:', error);
        throw new Error('Error processing ATS request');
    }
}

export async function POST(req) {
    try {
        const { text } = await req.json();
        
        if (!text) {
            return NextResponse.json(
                { error: "Resume text is required" },
                { status: 400 }
            );
        }

        const result = await getAtsScore(text);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in ATS API:', error);
        return NextResponse.json(
            { error: "Failed to process resume" },
            { status: 500 }
        );
    }
}