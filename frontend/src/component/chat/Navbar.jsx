import {Box, Flex} from "@chakra-ui/react";
import React from "react";
import {useNavigate} from "react-router-dom";


export function Navbar() {
  const navigate = useNavigate();
  return (
    <Flex
      bgColor={"gray.100"}
      boxSize={"100%"}
      h={"50px"}
      gap={5}
      alignContent={"space-between"}>
      <Box
        _hover={{cursor: "pointer", bgColor: "gray.200"}}
        onClick={() => navigate("/")}>
        Home
      </Box>
      <Box
        _hover={{cursor: "pointer", bgColor: "gray.200"}}
        onClick={() => navigate("/aichat")}>
        AI 수의사
      </Box>
      <Flex gap={5} position={"absolute"} right={5}>
        <Box
          _hover={{cursor: "pointer", bgColor: "gray.200"}}
          onClick={() => navigate("/member/signup")}>
          회원가입
        </Box>
        <Box
          _hover={{cursor: "pointer", bgColor: "gray.200"}}
          onClick={() => navigate("/member/login")}>
          로그인
        </Box>
      </Flex>
    </Flex>
  );
}