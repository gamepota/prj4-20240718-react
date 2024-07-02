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
  Img,
  Input,
  InputGroup,
  Link,
  Spinner,
  Text,
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

  async function handleNaverLogin() {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  }

  return (
    <>
      <Center mt={5}>
        <Box w={500} p={6} boxShadow="lg" borderRadius="md" bg="white">
          <Box mb={10} fontSize="2xl" fontWeight="bold" textAlign="center">
            로그인
          </Box>
          <Box>
            {error && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                {error}
              </Alert>
            )}
            <FormControl mb={4}>
              <FormLabel>이메일</FormLabel>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="이메일을 입력하세요"
                onKeyPress={handleKeyPress}
              />
            </FormControl>
            <FormControl mb={4}>
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
            <Flex justifyContent="space-between" mb={5}>
              <FormControl display="flex" alignItems="center"></FormControl>
              <Flex
                gap={5}
                fontSize="sm"
                justifyContent="flex-end"
                alignItems="center"
                minWidth="200px"
              >
                <Link
                  as={RouterLink}
                  to="/member/find"
                  whiteSpace="nowrap"
                  _hover={{ fontWeight: "bold" }}
                >
                  비밀번호 찾기
                </Link>
              </Flex>
            </Flex>
            <Box mt={5}>
              <Button
                width={"100%"}
                height={"50px"}
                bg={"#E6E6FA"}
                color="purple"
                _hover={{ bg: "#DCD0FF" }}
                onClick={handleLogin}
                isLoading={isLoading}
                leftIcon={<Img src="/img/favicon.png" boxSize="20px" />}
              >
                {isLoading ? <Spinner size="sm" /> : "펫밀리로 로그인"}
              </Button>
              <Button
                mt={4}
                width={"100%"}
                height={"50px"}
                bg="#03C75A"
                color="white"
                _hover={{ bg: "#02A447" }}
                leftIcon={<Img src="/img/naver-logo.png" boxSize="20px" />}
                onClick={handleNaverLogin}
              >
                네이버로 로그인
              </Button>
            </Box>
            <Text mt={5} textAlign="center">
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
          </Box>
        </Box>
      </Center>
    </>
  );
}
