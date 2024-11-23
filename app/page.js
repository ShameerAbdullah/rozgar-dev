import {
  Brain,
  FileText,
  CircleEqual,
  Search,
  Upload,
  CircleCheckBig,
  Linkedin 
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent, Typography, Container, Grid, AppBar, Toolbar, Button } from "@mui/material";
import Link from "next/link";

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

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <AppBar
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        position: { xs: "relative", lg: "fixed" }, 
      }}
      className="border-b "
    >
      <Container>
        <Toolbar disableGutters className="flex justify-between">
          <Link href="#home" passHref>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "800", fontSize: "1.5rem" }}
            className="bg-gradient-to-r from-[#4b8b93] to-[#8d5227] text-transparent bg-clip-text cursor-pointer"
          >
            ROZGAR
          </Typography>
          </Link>

          <div className="sm:flex hidden space-x-6">
            <Link href="#home" passHref>
              <Typography
                variant="body1"
                className="cursor-pointer hover:underline"
              >
                Home
              </Typography>
            </Link>
            <Link href="#features" passHref>
              <Typography
                variant="body1"
                className="cursor-pointer hover:underline"
              >
                Features
              </Typography>
            </Link>
            <Link href="#how-it-works" passHref>
              <Typography
                variant="body1"
                className="cursor-pointer hover:underline"
              >
                How It Works
              </Typography>
            </Link>
          </div>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4b8b93",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#397a7f",
              },
            }}
          >
            Join Waitlist
          </Button>
        </Toolbar>
      </Container>
    </AppBar>

      <section
        id="home"
        className="flex justify-center items-center py-12 mt-12 h-auto lg:h-screen lg:mt-0"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Typography
                variant="h3"
                className="text-black font-bold mb-6"
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.5rem", lg: "3rem" },
                  fontWeight: "bolder",
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
            </div>

            <div className="relative w-full h-80 lg:h-96 bg-[#4b8b93] rounded-full">
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
        className="bg-gray-100 py-12 h-auto lg:h-screen flex justify-center items-center"
      >
        <Container>
          <Typography
            variant="h3"
            className="text-center text-black font-bold mb-12"
            sx={{ fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" } }}
          >
            Key Features
          </Typography>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            className="flex-wrap"
          >
            {features.map(({ id, logo, title, description }) => (
              <Grid item xs={12} sm={6} md={3} key={id}>
                <Card className="bg-white shadow-lg rounded-lg h-60 lg:w-75">
                  <CardContent className="text-center p-6">
                    {logo}
                    <Typography
                      variant="h6"
                      className="text-black font-semibold mt-4"
                    >
                      {title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-700 mt-2">
                      {description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      <section
        id="how-it-works"
        className="bg-white py-12 lg:h-screen flex justify-center items-center"
      >
        <Container>
          <Typography
            variant="h3"
            className="text-center text-black font-bold mb-12"
            sx={{ fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" } }}
          >
            How It Works
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {howItWorks.map(({ id, logo, title, description }) => (
              <Grid item xs={12} sm={6} md={4} key={id}>
                <Card className="bg-white shadow-none rounded-lg h-60">
                  <CardContent className="text-center p-6">
                    <div className="bg-gray-100 rounded-full p-3 inline-flex justify-center items-center">
                      {logo}
                    </div>
                    <Typography
                      variant="h5"
                      className="text-black font-semibold mt-4"
                    >
                      {title}
                    </Typography>
                    <Typography variant="body1" className="text-gray-700 mt-2">
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
            className="font-bold"
            sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
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

        <div className="text-center mb-10">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffffff",
              color: "#4b8b93",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#f3f3f3",
              },
            }}
          >
            Join Waitlist
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-300 pt-6">
          <Typography
            variant="body2"
            className="text-gray-300 text-center sm:text-left mb-4 sm:mb-0"
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
