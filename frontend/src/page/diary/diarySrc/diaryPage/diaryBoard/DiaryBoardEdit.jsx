import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function DiaryBoardEdit() {
  const [board, setBoard] = useState(null);
  const { id } = useDisclosure();

  function handleClickSave() {
    axios.put();
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
