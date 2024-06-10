import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState } from "react";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
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
    </Box>
  );
}
