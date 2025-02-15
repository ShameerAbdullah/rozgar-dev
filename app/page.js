"use client";

import {
  Brain,
  FileText,
  CircleEqual,
  Search,
  Upload,
  CircleCheckBig,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Button,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  const features = [
    {
      id: 1,
      logo: <Brain size={30} className="mx-auto text-[#4b8b93]" />,
      title: "AI Job Recommendations",
      description:
        "Get personalized job matches based on your skills and experience with real-time updates.",
    },
    {
      id: 2,
      logo: <FileText size={30} className="mx-auto text-[#4b8b93]" />,
      title: "Resume Scoring & ATS Optimization",
      description:
        "Advanced ATS compatibility check with detailed improvement suggestions.",
    },
    {
      id: 3,
      logo: <CircleEqual size={30} className="mx-auto text-[#4b8b93]" />,
      title: "Job Description Match",
      description:
        "Real-time resume comparison with job posts and skills gap analysis.",
    },
    {
      id: 4,
      logo: <Search size={30} className="mx-auto text-[#4b8b93]" />,
      title: "AI-Powered Job Search",
      description:
        "Natural language search capabilities with smart filters for industry and role.",
    },
  ];

  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  const howItWorks = [
    {
      id: 1,
      logo: <Upload size={30} className="mx-auto text-black" />,
      title: "Upload Your Resume",
      description: "Quick profile creation with instant skills analysis.",
    },
    {
      id: 2,
      logo: <CircleEqual size={30} className="mx-auto text-black" />,
      title: "Get Matched",
      description: "AI-curated job recommendations and personalized alerts.",
    },
    {
      id: 3,
      logo: <CircleCheckBig size={30} className="mx-auto text-black" />,
      title: "Apply Confidently",
      description:
        "Optimized application materials with higher response rates.",
    },
  ];

  const isLargeScreen = useMediaQuery("(min-width:600px)");

  return (
    <div className="bg-white text-gray-50 min-h-screen">
      <Navbar />
      <section
        id="home"
        className="flex justify-center items-center py-12 h-auto lg:h-screen pt-10 lg:pt-0"
        style={{
          backgroundImage: "url('/bg1.jpg')",
        }}
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Typography
                variant="h3"
                className="text-black font-bold"
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.5rem", lg: "3rem" },
                  fontWeight: "bolder",
                  marginBottom: "1rem",
                }}
              >
                Transform Your Job Search with{" "}
                <span className="bg-gradient-to-r from-[#4b8b93] to-[#8d5227] text-transparent bg-clip-text">
                  AI-Powered
                </span>{" "}
                Precision
              </Typography>

              <Typography
                variant="body1"
                className="text-gray-700"
                sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
              >
                Let our intelligent platform match you with perfect
                opportunities while optimizing your career materials for
                success.
              </Typography>

              <Link href="/jobs" passHref>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4b8b93",
                  color: "white",
                  fontWeight: "bold",
                  marginTop: 2,
                  marginRight: 2,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#397a7f",
                  },
                }}
              >
                Explore Jobs
              </Button>
              </Link>

              <Link href="/ats" passHref>
              <Button
                variant="outlined"
                sx={{
                  color: "#4b8b93",
                  fontWeight: "bold",
                  marginTop: 2,
                  textTransform: "none",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                ATS Score
              </Button>
              </Link>
            </div>

            <div className="relative w-full h-80 lg:h-96 rounded-full">
              <Image
                src="/logo.png"
                alt="AI Job Search"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </Container>
      </section>
      <section
        id="features"
        className="bg-gray-50 py-12 h-auto lg:h-screen flex justify-center items-center"
      >
        <Container>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              color: "black",
              fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
              fontWeight: "bolder",
              marginBottom: "3.5rem",
            }}
          >
            Key Features
          </Typography>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            {features.map(({ id, logo, title, description }, index) => {
              const isActive = isLargeScreen && activeFeature === index;

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={id}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    sx={{
                      height: "16rem",
                      width: "100%",
                      maxWidth: "300px",
                      transition:
                        "transform 0.5s ease, background-color 0.5s ease, color 0.5s ease",
                      backgroundColor: isActive ? "#4b8b93" : "#ffffff",
                      color: isActive ? "white" : "black",
                      boxShadow: 3,
                      borderRadius: "10px",
                      cursor: "pointer",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <CardContent
                      sx={{
                        textAlign: "center",
                        padding: 3,
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: "50%",
                          padding: 2,
                          display: "inline-flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: isActive
                            ? "white"
                            : "rgb(243, 244, 246)",
                          transition: "background-color 0.5s ease",
                        }}
                      >
                        {logo}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          marginTop: 2,
                          transition: "color 0.5s ease",
                          color: isActive ? "white" : "black",
                        }}
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          marginTop: 1,
                          transition: "color 0.5s ease",
                          color: isActive ? "white" : "gray",
                        }}
                      >
                        {description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </section>
      ;
      <section
        id="how-it-works"
        className="bg-cover bg-center bg-no-repeat py-12 lg:h-screen flex justify-center items-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <Container>
          <Typography
            variant="h3"
            className="text-center text-black mb-12"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
              fontWeight: "bolder",
              marginBottom: "3.5rem",
            }}
          >
            How It Works
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {howItWorks.map(({ id, logo, title, description }) => (
              <Grid item xs={12} sm={6} md={4} key={id}>
                <Card
                  className="h-60 bg-white cursor-pointer mx-auto"
                  sx={{
                    boxShadow: 10,
                    backdropFilter: "blur(1px)",
                    borderRadius: "10px",
                    width: "90%",
                    maxWidth: "280px",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardContent className="text-center p-6">
                    <div className="bg-gray-50 rounded-full p-3 inline-flex justify-center items-center">
                      {logo}
                    </div>
                    <Typography
                      variant="h5"
                      className="text-black mt-4"
                      sx={{ fontWeight: "bold", marginTop: "1rem" }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="text-gray-700"
                      sx={{ marginTop: "1rem" }}
                    >
                      {description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>
      <footer className="bg-[#4b8b93] text-white py-12">
        <Container>
          <div className="text-center mb-6">
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem", fontWeight: "bold" },
              }}
            >
              Ready to Transform Your Job Search
            </Typography>
          </div>

          <div className="text-center mb-8">
            <Typography
              variant="body1"
              className="text-gray-100"
              sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
            >
              Join thousands of successful job seekers who found their dream
              positions through Rozgar&apos;s AI-powered platform.
            </Typography>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-300 pt-6">
            <Typography
              variant="body2"
              className="text-gray-300 text-center sm:text-left"
              sx={{ marginBottom: "1rem" }}
            >
              &copy; 2024 Rozgar. All rights reserved.
            </Typography>

            <div className="flex items-center space-x-2">
              <Link
                href="https://www.linkedin.com/company/rozgar-organization"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Linkedin size={24} />
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
