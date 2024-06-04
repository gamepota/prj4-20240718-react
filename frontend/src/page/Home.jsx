import Navbar from "./for_develop/Navbar.jsx";
import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export function Home() {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
}
