import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Job from '@/models/Job';

export async function GET(req, context) {
    try {
        await connectDB();
        
        const id = await context.params.id;
        const job = await Job.findById(id);
        
        if (!job) {
            return NextResponse.json(
                { error: "Job not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error('Error fetching job:', error);
        return NextResponse.json(
            { error: "Failed to fetch job details" },
            { status: 500 }
        );
    }
}
