import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import { generateDiaryId } from "../../../../../util/util.jsx";

export function DiaryBoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { memberInfo } = useContext(LoginContext);
  const access = memberInfo?.access || null;
  const isLoggedIn = Boolean(access);
  const toast = useToast();
  const navigate = useNavigate();
  const username = memberInfo?.nickname || "";
  const diaryId = generateDiaryId(memberInfo.id);

  const handleSaveClick = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("diaryId", diaryId);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("username", username);

    axios
      .post("/api/diaryBoard/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast({
          description: "새 글이 등록되었습니다.",
          status: "success",
          position: "top",
        });
        navigate(`/diary/${diaryId}/list/`);
      })
      .catch((e) => {
        const code = e.response.status;
        if (code === 400) {
          toast({
            status: "error",
            description: "등록되지 않았습니다. 입력한 내용을 확인하세요.",
            position: "top",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  const disableSaveButton =
    title.trim().length === 0 || content.trim().length === 0;

  if (!isLoggedIn) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Center mt={5}>
      <Box w={500} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Heading mb={10} textAlign="center">
          글 작성
        </Heading>
        <FormControl mb={4}>
          <FormLabel>작성자</FormLabel>
          <Input value={username} readOnly />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>제목</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>본문</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="본문을 입력하세요"
            height="200px"
          />
        </FormControl>
        <Button
          isLoading={loading}
          isDisabled={disableSaveButton}
          colorScheme="blue"
          width="100%"
          onClick={handleSaveClick}
        >
          저장
        </Button>
      </Box>
    </Center>
  );
}
