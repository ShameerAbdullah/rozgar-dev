"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";
import Link from "next/link";

export default function Navbar() {

  return (
    <AppBar
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        position: { xs: "relative", lg: "fixed" },
      }}
      className="border-b"
    >
      <Container>
        <Toolbar disableGutters className="flex justify-between items-center">
          <Link href="/" className="no-underline">
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "800",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
              }}
              className="bg-black text-transparent bg-clip-text cursor-pointer"
            >
              ROZG
              <img
                src="/logo.png"
                alt="Logo"
                className="mx-1"
                style={{ height: 40 }}
              />
              R
            </Typography>
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            <Link href="/" className="no-underline">
              <Typography
                variant="body1"
                sx={{
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
                sx={{ "&:hover": { color: "#4b8b93" } }}
                className="cursor-pointer text-black"
              >
                Features
              </Typography>
            </Link>
            <Link href="/#how-it-works" className="no-underline">
              <Typography
                variant="body1"
                sx={{ "&:hover": { color: "#4b8b93" } }}
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
