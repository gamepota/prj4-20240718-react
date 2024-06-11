import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { DiaryNavbar } from "../diaryComment/DiaryNavbar.jsx";

export function DiaryHome() {
  return (
    <Box mb={30}>
      <DiaryNavbar />
      <Box
        mx={{
          base: 0,
          lg: 200,
        }}
        mt={100}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
