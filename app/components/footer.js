"use client";

import { Container, Typography } from "@mui/material";
import Link from "next/link";
import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#4b8b93] text-white py-2 items-center justify-center">
      <Container>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 pb-4">
          <Typography
            variant="body2"
            className="text-gray-300 text-center sm:text-left"
            sx={{ marginBottom: { xs: "1rem", sm: "0" } }}
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
  );
}
