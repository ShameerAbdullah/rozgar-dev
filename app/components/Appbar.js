"use client";

import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Link from "next/link";

export default function Appbar() {
  return (
    <AppBar
      sx={{
        backgroundColor: "white",
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
