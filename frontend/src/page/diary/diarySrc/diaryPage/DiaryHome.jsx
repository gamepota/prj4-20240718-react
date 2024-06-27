import React, { useContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Box, Center } from "@chakra-ui/react";
import { DiaryNavbar } from "../diaryComponent/DiaryNavbar.jsx";
import { LoginContext } from "../../../../component/LoginProvider.jsx";

export function DiaryHome() {
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const { diaryId } = useParams();

  // const generateDiaryId = (userId) => {
  //   return `DIARY-${userId * 17}-ID`; // 간단한 문자열 변환
  // };

  // const expectedDiaryId = generateDiaryId(memberInfo.id);

  // if (diaryId !== expectedDiaryId) {
  //   return <Box>잘못된 접근입니다.</Box>;
  // }

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
