import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const navigate = useNavigate();

  function handleSaveClick() {
    axios
      .post("/api/board/add", {
        title,
        content,
        writer,
      })
      .then(() => {
        navigate("/board");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Input>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>내용</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Textarea>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
          ></Input>
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
