"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Appbar from "../components/Appbar";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { CircularProgress, Box, Button } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import Footer from "../components/footer";

export default function ATS() {
  const [file, setFile] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [suggestions, setSuggestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => {
    setFile(null);
    setAtsScore(null);
    setSuggestions("");
    setIsLoading(false);
  };

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
        setSuggestions("Error extracting text.");
      }
    } catch (error) {
      setIsLoading(false);
      setSuggestions("Failed to upload or process PDF.");
    }
  };

  const fetchAtsScore = async (resumeText) => {
    const formData = new FormData();
    formData.append("resumeText", resumeText);

    try {
      const response = await fetch("/api/ats", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setAtsScore(data.atsScore);
        setSuggestions(data.suggestions);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setSuggestions("Error fetching ATS score.");
      }
    } catch (error) {
      setIsLoading(false);
      setSuggestions("Failed to fetch ATS score.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    maxFiles: 1,
    disabled: file !== null,
  });

  const getCircleColor = (score) => {
    if (score <= 50) return "red";
    if (score <= 84) return "yellow";
    return "green";
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Appbar />
      <div className="flex-1 justify-items-center pt-10 lg:pt-20">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-gray-400 p-10 m-2 rounded-lg text-center cursor-pointer transition-colors duration-300 ${
            file ? "bg-gray-100 cursor-not-allowed" : "hover:border-black"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-blue-500 font-semibold">📄 {file.name}</p>
          ) : isDragActive ? (
            <p className="text-blue-500">Drop the file here...</p>
          ) : (
            <div>
              <p className="text-sm">Drag & drop or click to select your CV/Resume</p>
              <p className="text-sm">Supported Format: .pdf</p>
            </div>
          )}
        </div>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress sx={{ color: "#4b8b93" }} />
          </Box>
        )}

        {atsScore !== null && !isLoading && (
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-x-6 p-4 rounded-lg w-3/4 mx-auto">
            <div className="w-60 h-60">
              <CircularProgressbarWithChildren
                value={atsScore}
                text={`${atsScore}%`}
                styles={buildStyles({
                  pathColor: getCircleColor(atsScore),
                  textColor: "#000",
                  trailColor: "#d6d6d6",
                  strokeWidth: 12,
                  textWeight: "bold",
                })}
              />
            </div>

            <div className="text-sm text-gray-700 lg:w-1/2 mt-20 lg:mt-0">
              {suggestions && (
                <>
                  <p className="font-semibold mb-2">
                    {suggestions.split(/\d+\.\s/)[0]}{" "}
                  </p>

                  <ul className="list-decimal list-inside space-y-2">
                    {suggestions
                      .split(/\d+\.\s/)
                      .slice(1)
                      .map((point, index) => (
                        <li key={index}>{point.trim()}</li>
                      ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}

        {atsScore !== null && !isLoading && (
          <div className="flex justify-center mt-6 mb-6 lg:mb-0">
            <Button
              variant="outlined"
              color="primary"
              onClick={resetState}
              className="text-blue-500"
            >
              Upload a New CV
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
