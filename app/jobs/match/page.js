"use client";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Appbar from "../../components/Appbar";
import { CircularProgress, Box } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "react-circular-progressbar/dist/styles.css";
import Footer from "../../components/footer";
import { useRouter } from "next/navigation";

export default function JobMatch() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [matchedJobs, setMatchedJobs] = useState([]);

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const pdfFile = acceptedFiles[0];
      setFile(pdfFile);
      extractTextFromPDF(pdfFile);
    }
  };

  const extractTextFromPDF = async (pdfFile) => {
    const formData = new FormData();
    formData.append("pdfFile", pdfFile);

    setIsLoading(true);

    try {
      const response = await fetch("/api/loader", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        fetchMatchedJobs(data.text);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const fetchMatchedJobs = async (text) => {
    try {
      const response = await fetch("/api/ats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (response.ok) {
        // Extract skills and other information from ATS response
        const extractedInfo = {
          skills: data.skills || [],
          education: data.education || '',
          experience: data.experience || 0,
          keywords: data.keywords || []
        };

        // Fetch matching jobs
        const jobsResponse = await fetch("/api/jobs/match", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(extractedInfo),
        });

        const jobsData = await jobsResponse.json();
        if (jobsResponse.ok) {
          setMatchedJobs(jobsData.data);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const handleViewDetails = (jobId) => {
    // Navigate to job details
    router.push(`/jobs/${jobId}`);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragActive ? "border-[#4B8B93]" : "border-gray-300"
          } cursor-pointer hover:border-[#4B8B93] transition-colors duration-200`}
        >
          <input {...getInputProps()} />
          {isLoading ? (
            <div className="flex justify-center items-center">
              <CircularProgress style={{ color: "#4B8B93" }} />
            </div>
          ) : (
            <p className="text-gray-600">
              Drag and drop a PDF file here, or click to select a file
            </p>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center mt-6">
            <CircularProgress style={{ color: '#2563EB' }} />
          </div>
        )}

        {matchedJobs.length > 0 && (
          <div className="flex-1 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Matching Jobs Based on Your CV</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {matchedJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  onClick={() => handleViewDetails(job._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-gray-600">{job.company_name}</p>
                    </div>
                    <div className="bg-[#4B8B93] bg-opacity-10 px-3 py-1 rounded-full">
                      <span className="text-[#4B8B93] font-medium">
                        {job.matchScore}% Match
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 flex items-center mb-3">
                    <LocationOnIcon sx={{ fontSize: 18, marginRight: 0.5 }} />
                    {job.location}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.required_skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
