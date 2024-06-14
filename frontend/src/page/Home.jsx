import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavbarGH from "./for_develop/NavbarGH.jsx";

export function Home() {
  return (
    <Box>
      <NavbarGH />
      <Outlet />
    </Box>
  );
}
