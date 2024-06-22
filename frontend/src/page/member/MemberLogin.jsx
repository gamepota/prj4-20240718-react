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

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem("access", response.data.access);
        // 닉네임을 로컬 스토리지에 저장
        localStorage.setItem("nickname", response.data.nickname);

        const { access, id, nickname } = response.data;
        setMemberInfo({ access, id, nickname });
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
    <>
      <Center>
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
                <Link
                  as={RouterLink}
                  to="/member/signup"
                  whiteSpace="nowrap"
                  _hover={{ fontWeight: "bold" }}
                >
                  회원가입
                </Link>
              </Flex>
            </Flex>
            <Box mt={5}>
              <Button
                width={"100%"}
                _hover={{ bgColor: "purple.500 ", color: "white" }}
                onClick={handleLogin}
                isLoading={isLoading}
              >
                {isLoading ? <Spinner size="sm" /> : "로그인"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
}
