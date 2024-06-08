import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function DiaryNavbar() {
  const navigate = useNavigate();

  return (
    <Flex gap={3}>
      <Box onClick={() => navigate("/")}>홈</Box>
      <Box
        onClick={() => navigate("/DiaryBoardWrite")}
        cursor={"pointer"}
        _hover={{
          bg: "blue.200",
        }}
      >
        방명록
      </Box>
      <Box
        onClick={() => navigate("/DiaryGallery")}
        cursor={"pointer"}
        _hover={{
          bg: "blue.200",
        }}
      >
        사진첩
      </Box>
    </Flex>
  );
}
