import React, { useContext } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../component/LoginProvider.jsx";

export function DiaryNavbar() {
  const navigate = useNavigate();
  const { memberInfo, setMemberInfo } = useContext(LoginContext);

  return (
    <Flex boxSize={"100%"} h={"50px"} alignContent={"space-between"} gap={5}>
      <Box>
        <Button
          onClick={() => navigate(`/diary/home/${memberInfo.id}`)}
          cursor={"pointer"}
          _hover={{
            bgColor: "blue.200",
          }}
        >
          홈
        </Button>
      </Box>
      <Box>
        <Button
          onClick={() => navigate("/diaryComment/list")}
          cursor={"pointer"}
          _hover={{
            bg: "blue.200",
          }}
        >
          방명록
        </Button>
      </Box>
      <Box>
        <Button
          onClick={() => navigate("/diary/list")}
          cursor={"pointer"}
          _hover={{
            bgColor: "blue.200",
          }}
        >
          내 다이어리
        </Button>
      </Box>
      <Box>
        <Button
          onClick={() => navigate("/diary/schedule")}
          cursor={"pointer"}
          _hover={{
            bg: "blue.200",
          }}
        >
          접종 날짜
        </Button>
      </Box>
    </Flex>
  );
}
