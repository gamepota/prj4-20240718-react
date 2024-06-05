import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  function handleSaveClick() {
    axios
      .post("/api/board/add", {
        title,
        content,
      })
      .then(() => {
        navigate("/boardList");
      });
  }

  return (
    <Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input onChange={(e) => setTitle(e.target.value)}></Input>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>내용</FormLabel>
          <Textarea onChange={(e) => setContent(e.target.value)}></Textarea>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input readOnly value="작성자"></Input>
        </FormControl>
      </Box>
      <Box>
        <Button colorScheme={"blue"} onClick={handleSaveClick}>
          저장
        </Button>
      </Box>
    </Box>
  );
}
