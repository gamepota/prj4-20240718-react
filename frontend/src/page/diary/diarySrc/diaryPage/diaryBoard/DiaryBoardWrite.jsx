import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const account = useContext(LoginContext);
  const toast = useToast();
  const navigate = useNavigate();

  function handleSaveClick() {
    setLoading(true);
    axios
      .post("/api/diaryBoard/add", {
        title,
        content,
        username: account.id,
        files,
      })
      .then(() => {
        toast({
          description: "새 글이 등록되었습니다.",
          status: "success",
          position: "top",
        });
        navigate("/");
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
  }

  let disableSaveButton = false;
  if (title.trim().length === 0) {
    disableSaveButton = true;
  }
  if (content.trim().length === 0) {
    disableSaveButton = true;
  }

  // file 목록 작성
  const fileNameList = [];
  for (let i = 0; i < files.length; i++) {
    fileNameList.push(
      <Box>
        <Text fontSize={"md"}>{files[i].name}</Text>
      </Box>,
    );
  }

  return (
    <Box>
      <Box mb={10}>
        <Heading>글 작성</Heading>
      </Box>
      <Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea onChange={(e) => setContent(e.target.value)} />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>파일</FormLabel>
            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
            />
          </FormControl>
        </Box>
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
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input readOnly value={account.nickName} />
          </FormControl>
        </Box>
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
  );
}
