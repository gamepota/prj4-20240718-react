import { useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <Flex gap={3}>
      <Box
        onClick={() => navigate("/")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        HOME
      </Box>
      <Box
        onClick={() => navigate("/write")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        글쓰기
      </Box>
      <Box
        onClick={() => navigate("/member/list")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        회원목록
      </Box>
      <Box
        onClick={() => navigate("/signup")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        회원가입
      </Box>
      <Box
        onClick={() => navigate("/login")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        로그인
      </Box>
      <Box
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        로그아웃
      </Box>
    </Flex>
  );
}
