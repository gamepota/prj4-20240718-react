import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { DiaryNavbar } from "../diaryComment/DiaryNavbar.jsx";

function DiaryHome(props) {
  return (
    <Box mb={300}>
      <DiaryNavbar />
      <Box
        mx={{
          base: 0,
          lg: 200,
        }}
        mt={10}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default DiaryHome;
