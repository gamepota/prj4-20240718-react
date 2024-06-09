import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Spinner,
} from "@chakra-ui/react";

export function MemberLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    // 유효성 검사
    if (!email) {
      setError("이메일을 입력하세요.");
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError("비밀번호를 입력하세요.");
      setIsLoading(false);
      return;
    }
  };

  return (
    <>
      <Center>
        <Box w={500} p={6} boxShadow="lg" borderRadius="md" bg="white">
          <Box mb={10} fontSize="2xl" fontWeight="bold" textAlign="center">
            회원 로그인
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
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
                ></Input>
              </InputGroup>
            </FormControl>
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
