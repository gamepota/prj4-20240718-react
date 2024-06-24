import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { DiaryNavbar } from "../diaryComponent/DiaryNavbar.jsx";

export function DiaryHome() {
  return (
    <Box mb={30}>
      <Box>
        <DiaryNavbar />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
