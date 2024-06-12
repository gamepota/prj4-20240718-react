import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function DiaryBoardWrite() {
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchMemberName = async () => {
  //     try {
  //       const response = await axios.get("/api/member"); // API 엔드포인트를 적절히 변경
  //       setWriter(response.data.name); // API 응답에 맞게 조정
  //     } catch (error) {
  //       // console.error("멤버 이름을 가져오는 데 실패했습니다", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchMemberName();
  // }, []);

  function handleSaveClick() {
    setLoading(true);
    axios
      .postForm(`/api/diaryBoard/add`, {
        content,
        writer,
      })
      .then(() => {
        toast({
          status: "success",
          description: "방명록이 등록되었습니다.",
          position: "top",
        });
        navigate("/");
      })
      .catch((e) => {
        const code = e.response.status;

        if (code === 404) {
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

  if (content.trim().length === 0) {
    disableSaveButton = true;
  }

  const fileNameList = [];
  for (let i = 0; i < files; i++) {
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
          <Box textAlign="center">방명록 작성</Box>
          <Box>
            <Box mb={7}>
              <FormControl>
                <FormLabel>작성자</FormLabel>
                <Input value={writer} readOnly />
              </FormControl>
            </Box>

            <Box>
              <FormControl>
                <FormLabel>글 작성</FormLabel>
                <Textarea onChange={(e) => setContent(e.target.value)} />
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

              <FormControl mt={3}>
                <Button
                  isLoading={loading}
                  isDisabled={disableSaveButton}
                  colorScheme={"blue"}
                  onClick={handleSaveClick}
                >
                  등록
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}
