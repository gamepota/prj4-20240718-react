import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export function CommentWrite() {
  const [comment, setComment] = useState("");
  return (
    <Box>
      <Textarea
        placeholder="리뷰를 남겨주세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button colorScheme="blue">아이콘</Button>
    </Box>
  );
}
