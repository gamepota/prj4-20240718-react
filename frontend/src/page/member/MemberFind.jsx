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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export function MemberFind() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const toast = useToast();

  async function handleFindPassword(event) {
    if (event) event.preventDefault(); // form submit 방지

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    // 유효성 검사
    if (!username) {
      setError("이메일이 입력되지 않았습니다.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/member/sendEmail", { username });

      if (response.status === 200) {
        setSuccessMessage("임시 비밀번호가 이메일로 전송되었습니다.");
        toast({
          title: "성공",
          description: "임시 비밀번호가 이메일로 전송되었습니다.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setError("비밀번호 재설정 링크 전송에 실패했습니다.");
      }
    } catch (error) {
      setError("이메일 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleFindPassword(event);
    }
  };

  return (
    <Center mt={5}>
      <Box w={500} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Box mb={10} fontSize="2xl" fontWeight="bold" textAlign="center">
          비밀번호 찾기
        </Box>
        <Box>
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              {successMessage}
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
          <Box mt={5}>
            <Button
              width={"100%"}
              _hover={{ bgColor: "purple.500", color: "white" }}
              onClick={handleFindPassword}
              isLoading={isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : "비밀번호 찾기"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
