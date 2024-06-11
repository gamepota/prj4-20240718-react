import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function DiaryBoardEdit() {
  const [board, setBoard] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/diaryBoard/${id}`).then((res) => setBoard(res.data));
  }, []);

  function handleClickSave() {
    axios.put("/api/diaryBoard/edit", board);
  }

  if (board === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>{board.writer}님 방명록 수정</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>글</FormLabel>
            <Textarea
              defaultValue={board.content}
              onChange={(e) => setBoard({ ...board, content: e.target.value })}
            ></Textarea>
          </FormControl>
        </Box>
        <Box>
          <Button onClick={handleClickSave} colorScheme={"blue"}>
            수정
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
