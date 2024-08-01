import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";

export function Home() {
  return (
    <Box>
      <Box>navabr</Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
