import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Box, Center } from "@chakra-ui/react";
import { DiaryNavbar } from "../diaryComponent/DiaryNavbar.jsx";
import { LoginContext } from "../../../../component/LoginProvider.jsx";

export function DiaryHome() {
  const { memberInfo, setMemberInfo } = useContext(LoginContext);

  return (
    <Box mb={30}>
      <Box>
        <Center fontSize="25px">{memberInfo.nickname}님의 펫 다이어리</Center>
      </Box>
      <Box>
        <DiaryNavbar />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
