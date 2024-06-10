import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./for_develop/Navbar.jsx";

export function Home() {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
}
