"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Appbar from "../components/Appbar";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { CircularProgress, Container, Box, Typography, Grid, Paper, Chip } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import Footer from "../components/footer";

export default function ATS() {
  const [file, setFile] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [suggestions, setSuggestions] = useState("");
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState(0);
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        fetchAtsScore(data.text);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const fetchAtsScore = async (text) => {
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
        setAtsScore(data.score);
        setSuggestions(data.suggestions);
        setSkills(data.skills);
        setEducation(data.education);
        setExperience(data.experience);
        setKeywords(data.keywords);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Appbar />
      <Container className="flex-1 flex flex-col justify-center items-center py-12">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center w-full max-w-lg ${
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

        {atsScore !== null && !isLoading && (
          <Box className="flex flex-col items-center bg-white p-6 rounded-lg shadow-sm w-full max-w-lg mt-8">
            <div style={{ width: 180, height: 180 }}>
              <CircularProgressbarWithChildren
                value={atsScore}
                styles={buildStyles({
                  rotation: 0,
                  strokeLinecap: "round",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                  pathColor: "#4B8B93",
                  textColor: "#4B8B93",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">{atsScore}%</div>
                  <div className="text-gray-600">ATS Score</div>
                </div>
              </CircularProgressbarWithChildren>
            </div>
            {suggestions && (
              <Box className="mt-6 w-full">
                <Typography variant="h6" className="text-gray-800 mb-2">Suggestions</Typography>
                <Typography className="text-gray-600 text-sm">{suggestions}</Typography>
              </Box>
            )}
          </Box>
        )}

        {atsScore !== null && !isLoading && (
          <Grid container spacing={4} className="mt-8">
            <Grid item xs={12} md={6}>
              <Paper className="p-4">
                <Typography variant="h6" className="text-gray-800 mb-2">Skills</Typography>
                {skills.length > 0 ? (
                  <Box className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Chip key={index} label={skill} color="primary" />
                    ))}
                  </Box>
                ) : (
                  <Typography className="text-gray-600">No skills found</Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className="p-4">
                <Typography variant="h6" className="text-gray-800 mb-2">Education</Typography>
                <Typography className="text-gray-600">{education || "No education information found"}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className="p-4">
                <Typography variant="h6" className="text-gray-800 mb-2">Experience</Typography>
                <Typography className="text-gray-600">{experience} years</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className="p-4">
                <Typography variant="h6" className="text-gray-800 mb-2">Keywords</Typography>
                {keywords.length > 0 ? (
                  <Box className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <Chip key={index} label={keyword} color="secondary" />
                    ))}
                  </Box>
                ) : (
                  <Typography className="text-gray-600">No keywords found</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
      <Footer />
    </div>
  );
}
