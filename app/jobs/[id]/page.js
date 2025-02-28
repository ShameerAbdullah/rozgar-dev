"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Appbar from "../../components/Appbar";
import Footer from "../../components/footer";
import { Box, Chip, Container, Paper, Typography } from "@mui/material";
import { 
  LocationOn, 
  Business, 
  Timeline, 
  WorkOutline,
  ArrowBack
} from "@mui/icons-material";

export default function JobDetails() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${params.id}`);
        if (!response.ok) {
          throw new Error('Job not found');
        }
        const data = await response.json();
        setJob(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Appbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse w-full max-w-2xl">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Appbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <div className="text-center py-12">
            <Typography variant="h5" color="error" gutterBottom>
              {error}
            </Typography>
            <button
              onClick={handleBack}
              className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowBack sx={{ mr: 1 }} /> Go Back
            </button>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <Container maxWidth="lg" className="py-8">
        <button
          onClick={handleBack}
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowBack sx={{ mr: 1 }} /> Back to Results
        </button>

        <Paper elevation={0} className="bg-white rounded-lg shadow-sm p-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <Typography variant="h4" component="h1" className="text-gray-900 font-bold mb-4">
              {job.title}
            </Typography>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center text-gray-600">
                <Business sx={{ mr: 1 }} />
                <Typography variant="h6" className="text-gray-700">
                  {job.company_name}
                </Typography>
              </div>

              <div className="flex items-center text-gray-600">
                <LocationOn sx={{ mr: 1 }} />
                <Typography>{job.location}</Typography>
              </div>

              <div className="flex items-center text-gray-600">
                <WorkOutline sx={{ mr: 1 }} />
                <Typography>
                  {job.remote ? "Remote" : job.hybrid ? "Hybrid" : "On-site"}
                </Typography>
              </div>
            </div>
          </div>

          {(job.min_exp_in_years > 0 || job.max_exp_in_years > 0) && (
            <div className="mb-6">
              <Typography variant="h6" className="text-gray-800 mb-2">
                Experience Required
              </Typography>
              <div className="flex items-center text-gray-600">
                <Timeline sx={{ mr: 1 }} />
                <Typography>
                  {job.min_exp_in_years} - {job.max_exp_in_years} years
                </Typography>
              </div>
            </div>
          )}

          <div className="mb-6">
            <Typography variant="h6" className="text-gray-800 mb-3">
              Required Skills
            </Typography>
            <div className="flex flex-wrap gap-2">
              {job.required_skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{
                    bgcolor: '#EFF6FF',
                    color: '#2563EB',
                    '&:hover': { bgcolor: '#DBEAFE' },
                    borderRadius: '9999px',
                  }}
                />
              ))}
            </div>
          </div>

          {job.tags && job.tags.length > 0 && (
            <div className="mb-6">
              <Typography variant="h6" className="text-gray-800 mb-3">
                Tags
              </Typography>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    variant="outlined"
                    sx={{
                      borderColor: '#E5E7EB',
                      color: '#6B7280',
                      '&:hover': { borderColor: '#D1D5DB' },
                      borderRadius: '9999px',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <Typography variant="h6" className="text-gray-800 mb-3">
              Description
            </Typography>
            <Typography className="text-gray-600 whitespace-pre-wrap">
              {job.description}
            </Typography>
          </div>

          <div className="mb-6">
            <Typography variant="h6" className="text-gray-800 mb-3">
              Qualifications
            </Typography>
            <Typography className="text-gray-600 whitespace-pre-wrap">
              {job.qualifications}
            </Typography>
          </div>

          {(job.min_salary > 0 || job.max_salary > 0) && (
            <div className="mb-6">
              <Typography variant="h6" className="text-gray-800 mb-3">
                Salary Range
              </Typography>
              <Typography className="text-gray-600">
                {job.min_salary.toLocaleString()} - {job.max_salary.toLocaleString()} PKR
              </Typography>
            </div>
          )}

          <div>
            <Typography variant="h6" className="text-gray-800 mb-3">
              How to Apply
            </Typography>
            <Typography className="text-gray-600 whitespace-pre-wrap">
              {job.where_to_apply}
            </Typography>
          </div>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}
