import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../../diaryComponent/LoginProvider.jsx";

export function DiaryBoardWrite() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  function handleSaveClick() {
    setLoading(true);
    axios
      .postForm("/api/diaryBoard/add", {
        title,
        content,
        writer,
        files,
      })
      .then(() => {
        toast({
          status: "success",
          description: "방명록이 등록되었습니다.",
          position: "top",
        });
        navigate("/diaryBoard/list");
      })
      .catch((e) => {
        const code = e.response.status;

        if (code === 400) {
          toast({
            status: "error",
            description: "등록이 실패되었습니다. 입력한 내용을 확인하세요.",
            position: "top",
          });
        }
      })
      .finally(() => setLoading(false));
  }

  let disableSaveButton = false;

  if (title.trim().length === 0) {
    disableSaveButton = true;
  }
  if (content.trim().length === 0) {
    disableSaveButton = true;
  }
  const fileNameList = [];
  for (let i = 0; i < files.length; i++) {
    fileNameList.push(
      <Box>
        <Text fontSize={"mb"}>{files[i].name}</Text>
      </Box>,
    );
  }

  return (
    <Box>
      <Center>
        <Box w={700} p={6} boxShadow="lg" borderRadius="md" bg="white">
          <Box textAlign="center">게시물 업로드</Box>
          <Box>
            <Box mb={7}>
              <FormControl>
                <FormLabel>작성자</FormLabel>
                <Input value="작성자입니다" readOnly />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>제목</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>글 작성</FormLabel>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl mt={0.5}>
                <Input
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </FormControl>
            </Box>
            <Box>
              {fileNameList.length > 0 && (
                <Box mb={7}>
                  <Card>
                    <CardHeader>
                      <Heading size="md">선택된 파일 목록</Heading>
                    </CardHeader>
                    <CardBody>
                      <Stack divider={<StackDivider />} spacing={4}>
                        {fileNameList}
                      </Stack>
                    </CardBody>
                  </Card>
                </Box>
              )}
              <Box mb={7}>
                <Button
                  isLoading={loading}
                  isDisabled={disableSaveButton}
                  colorScheme={"blue"}
                  onClick={handleSaveClick}
                >
                  저장
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}
