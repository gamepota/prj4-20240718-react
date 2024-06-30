import React, { useContext, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Link,
  Spinner,
  Text,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberLogin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setMemberInfo } = useContext(LoginContext);
  const toast = useToast();

  async function handleLogin(event) {
    if (event) event.preventDefault(); // form submit 방지

    setIsLoading(true);
    setError("");

    // 유효성 검사
    if (!username) {
      setError("이메일이 입력되지 않았습니다.");
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError("비밀번호가 입력되지 않았습니다.");
      setIsLoading(false);
      return;
    }

    try {
      // FormData 객체 생성
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post("/api/member/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // 로그인 성공 시 처리
        console.log(response);
        console.log(response.data.nickname);

        const { access, id, nickname } = response.data;
        const memberInfo = { access, id, nickname };
        setMemberInfo(memberInfo);

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem("memberInfo", JSON.stringify(memberInfo));

        navigate("/");
      } else {
        setError("로그인에 실패했습니다.");
      }
    } catch (error) {
      setError("이메일 또는 비밀번호를 다시 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleLogin();
    }
  }

  return (
    <Center minHeight="80vh" bg="gray.50">
      <Box w={{ base: "90%", md: "500px" }} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="lg" textAlign="center">
            로그인
          </Heading>
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <FormControl id="email">
            <FormLabel>이메일</FormLabel>
            <Input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="이메일을 입력하세요"
              onKeyPress={handleKeyPress}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>비밀번호</FormLabel>
            <InputGroup>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                onKeyPress={handleKeyPress}
              />
            </InputGroup>
          </FormControl>
          <Flex justify="space-between">
            <Link as={RouterLink} to="/member/find" fontSize="sm" color="blue.500">
              비밀번호 찾기
            </Link>
          </Flex>
          <Button
            colorScheme="teal"
            onClick={handleLogin}
            isLoading={isLoading}
            width="full"
          >
            {isLoading ? <Spinner size="sm" /> : "로그인"}
          </Button>
          <Text textAlign="center">
            아직 펫밀리의 회원이 아니신가요?{" "}
            <Link
              as={RouterLink}
              to="/member/signup"
              color="blue.500"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
            >
              가입하기
            </Link>
          </Text>
        </VStack>
      </Box>
    </Center>
  );
}
