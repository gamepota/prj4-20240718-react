import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { Navbar } from "./compoent/Navbar.jsx";

export function Home() {
  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
