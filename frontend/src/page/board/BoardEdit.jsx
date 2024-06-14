import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => {
      setBoard(res.data);
    });
  }, []);
  function handleClickSave() {
    axios.put(`/api/board/edit`, board).then(() => {
      toast({
        status: "success",
        description: `${board.id}번 게시글이 수정되었습니다`,
        position: "top",
      });
      navigate(`/board/${id}`);
    });
  }

  //useEffect가 실행될때까지 스피너 돌아감..
  if (board === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>{id}번 게시물 수정</Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input
            defaultValue={board.title}
            onChange={(e) => setBoard({ ...board, title: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea
            defaultValue={board.content}
            onChange={(e) => setBoard({ ...board, content: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input
            defaultValue={board.writer}
            onChange={(e) => setBoard({ ...board, writer: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box>
        <Button colorScheme={"blue"} onClick={handleClickSave}>
          수정
        </Button>
      </Box>
    </Box>
  );
}
