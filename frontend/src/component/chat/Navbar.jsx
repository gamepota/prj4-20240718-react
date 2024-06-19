import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <Flex
      boxSize="100%"
      h="50px"
      gap={5}
      alignItems="center"
      justifyContent="space-between"
      px={5}
      bg="white"
      boxShadow="md"
    >
      <Flex gap={5}>
        <Box
          _hover={{ cursor: "pointer", bgColor: "gray.200" }}
          p={2}
          borderRadius="md"
          onClick={() => navigate("/")}
        >
          Home
        </Box>
        <Box
          _hover={{ cursor: "pointer", bgColor: "gray.200" }}
          p={2}
          borderRadius="md"
          onClick={() => navigate("/board/list")}
        >
          게시판
        </Box>
        <Box
          _hover={{ cursor: "pointer", bgColor: "gray.200" }}
          p={2}
          borderRadius="md"
          onClick={() => navigate("/place/map")}
        >
          동물병원 찾기
        </Box>
        <Box
          _hover={{ cursor: "pointer", bgColor: "gray.200" }}
          p={2}
          borderRadius="md"
          onClick={() => navigate("/board")}
        >
          반려동물 정보
        </Box>
        <Box
          _hover={{ cursor: "pointer", bgColor: "gray.200" }}
          p={2}
          borderRadius="md"
          onClick={() => navigate("/aichat")}
        >
          AI 수의사
        </Box>
      </Flex>
      <Flex gap={5} alignItems="center">
        <Flex>
          <Input
            type="text"
            placeholder="통합 검색"
            borderRadius="md"
            borderColor="gray.300"
          />
          <Button
            bgColor="purple.100"
            _hover={{ bgColor: "purple.200" }}
            ml={2}
          >
            검색
          </Button>
        </Flex>
        <Button
          bgColor="purple.100"
          _hover={{ bgColor: "purple.200" }}
          onClick={() => navigate("/board/write")}
        >
          새 글쓰기
        </Button>

        <Box
          _hover={{ cursor: "pointer", bgColor: "gray.200" }}
          p={2}
          borderRadius="md"
          onClick={() => navigate("/member/login")}
        >
          로그인
        </Box>
      </Flex>
    </Flex>
  );
}
