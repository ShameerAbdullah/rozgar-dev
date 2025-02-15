"use client";

import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
  return (
    <AppBar
      sx={{
        backgroundColor: "#f9fafb",
        color: "black",
        boxShadow: "xs",
        position: { xs: "relative", lg: "fixed" },
      }}
    >
      <Container>
        <Toolbar disableGutters className="flex justify-between items-center relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 sm:static sm:translate-x-0">
            <Link href="/" className="no-underline">
              <img src="/navbar.svg" alt="Header Logo" className="h-8" />
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-6 ml-auto">
            <Link href="/" className="no-underline">
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  "&:hover": { color: "#4b8b93" },
                }}
                className="cursor-pointer"
              >
                Home
              </Typography>
            </Link>
            <Link href="/#features" className="no-underline">
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", "&:hover": { color: "#4b8b93" } }}
                className="cursor-pointer text-black"
              >
                Features
              </Typography>
            </Link>
            <Link href="/#how-it-works" className="no-underline">
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", "&:hover": { color: "#4b8b93" } }}
                className="cursor-pointer text-black"
              >
                How It Works
              </Typography>
            </Link>
            <Link href="/jobs" passHref>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4b8b93",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#3d7179",
                  },
                  ml: 2,
                }}
              >
                Jobs
              </Button>
            </Link>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
