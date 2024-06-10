import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function BoardView() {
  const { id } = useParams();
  console.log(id);
  const [board, setBoard] = useState(null);
  const toast = useToast();
  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => {
        console.log(res.data);
        setBoard(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다",
            position: "top",
            duration: "500",
          });
        }
      });
  }, [id]);
  if (board === null) {
    return <Spinner />;
  }

  function handleClickRemove() {
    axios.delete("/api/board/" + board.id);
  }

  return (
    <Box>
      <Box>{board.id}번 게시물</Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={board.title} readOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Input value={board.content} readOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={board.writer} readOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성 일자</FormLabel>
          <Input type={"datetime-local"} value={board.inserted} readOnly />
        </FormControl>
      </Box>
      <Box>
        <Button colorScheme={"purple"}>수정</Button>
        <Button colorScheme={"red"} onClick={handleClickRemove}>
          삭제
        </Button>
      </Box>
    </Box>
  );
}
