import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import { extractUserIdFromDiaryId, generateDiaryId } from "../../../../../util/util.jsx";

export function DiaryBoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { memberInfo } = useContext(LoginContext);
  const access = memberInfo?.access || null;
  const isLoggedIn = Boolean(access);
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const username = memberInfo?.nickname || "";

  // diaryId가 유효한지 확인
  const diaryId = generateDiaryId(memberInfo.id);
  useEffect(() => {
    try {
      extractUserIdFromDiaryId(diaryId);
    } catch (error) {
      console.error("Invalid diaryId:", error.message);
      // 오류 처리 로직 추가
    }
  }, [diaryId]);

  const handleSaveClick = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("diaryId", diaryId);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("username", username);
    Array.from(files).forEach((file) => formData.append("files", file));

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

  const disableSaveButton = title.trim().length === 0 || content.trim().length === 0;

  if (!isLoggedIn) {
    return <Spinner />;
  }

  return (
    <Box maxW="800px" mx="auto" mt={10} p={5} boxShadow="md" borderRadius="md" bg="white">
      <Heading mb={10}>글 작성</Heading>
      <FormControl mb={7}>
        <FormLabel>작성자</FormLabel>
        <Input value={username} readOnly />
      </FormControl>
      <FormControl mb={7}>
        <FormLabel>제목</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl mb={7}>
        <FormLabel>본문</FormLabel>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </FormControl>
      <FormControl mb={7}>
        <FormLabel>파일</FormLabel>
        <Input
          multiple
          type="file"
          accept="image/*"
          onChange={(e) => setFiles(e.target.files)}
        />
        <FormHelperText>쬐끔만 넣어주시길 바랍니다</FormHelperText>
      </FormControl>
      {files.length > 0 && (
        <Box mb={7}>
          <Card>
            <CardHeader>
              <Heading size="md">선택된 파일 목록</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing={4}>
                {Array.from(files).map((file, index) => (
                  <Text key={index} fontSize="md">
                    {file.name}
                  </Text>
                ))}
              </Stack>
            </CardBody>
          </Card>
        </Box>
      )}
      <Button
        isLoading={loading}
        isDisabled={disableSaveButton}
        colorScheme="blue"
        onClick={handleSaveClick}
      >
        저장
      </Button>
    </Box>
  );
}
