import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function DiaryNavbar() {
  const navigate = useNavigate();

  return (
    <Flex gap={3}>
      <Box
        onClick={() => navigate("/diary/home")}
        cursor={"pointer"}
        _hover={{
          bg: "blue.200",
        }}
      >
        홈
      </Box>
      <Box
        onClick={() => navigate("/diary/write")}
        cursor={"pointer"}
        _hover={{
          bg: "blue.200",
        }}
      >
        방명록
      </Box>
      <Box
        onClick={() => navigate("/diary/gallery")}
        cursor={"pointer"}
        _hover={{
          bg: "blue.200",
        }}
      >
        사진첩
      </Box>
      <Box
        onClick={() => navigate("/diary/schedule")}
        cursor={"pointer"}
        _hover={{
          bg: "blue.200",
        }}
      >
        접종 날짜
      </Box>
    </Flex>
  );
}
