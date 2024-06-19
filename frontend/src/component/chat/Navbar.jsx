import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <Flex boxSize={"100%"} h={"50px"} gap={5} alignContent={"space-between"}>
      <Box
        _hover={{ cursor: "pointer", bgColor: "gray.200" }}
        onClick={() => navigate("/")}
      >
        Home
      </Box>
      <Box>
        <Button
          bgColor={"purple.100"}
          _hover={{ cursor: "pointer", bgColor: "purple.200" }}
          onClick={() => navigate("/board/write")}
        >
          {" "}
          새 글쓰기
        </Button>
      </Box>
      <Box
        _hover={{ cursor: "pointer", bgColor: "gray.200" }}
        onClick={() => navigate("/board/list")}
      >
        게시판
      </Box>
      <Box
        _hover={{ cursor: "pointer", bgColor: "gray.200" }}
        onClick={() => navigate("/place/map")}
      >
        동물병원 찾기
      </Box>
      <Box
        _hover={{ cursor: "pointer", bgColor: "gray.200" }}
        onClick={() => navigate("/board")}
      >
        반려동물 정보
      </Box>
      <Box>
        <Button
          bgColor={"purple.100"}
          _hover={{ cursor: "pointer", bgColor: "purple.200" }}
        >
          <Link to="diary/home" target="_blank">
            미니홈피
          </Link>
        </Button>
      </Box>

      <Box
        _hover={{ cursor: "pointer", bgColor: "gray.200" }}
        onClick={() => navigate("/aichat")}
      >
        AI 수의사
      </Box>
      <Flex gap={5} position={"absolute"} right={5}>
        <Box>
          <Input type={"text"} placeholder={"통합 검색"}></Input>
        </Box>
        <Button
          bgColor={"purple.100"}
          _hover={{ cursor: "pointer", bgColor: "purple.200" }}
        >
          {" "}
          검색{" "}
        </Button>
        <Box
          _hover={{ cursor: "pointer", bgColor: "gray.200" }}
          onClick={() => navigate("/member/signup")}
        >
          회원가입
        </Box>
        <Box
          _hover={{ cursor: "pointer", bgColor: "gray.200" }}
          onClick={() => navigate("/member/login")}
        >
          로그인
        </Box>
      </Flex>
    </Flex>
  );
}
