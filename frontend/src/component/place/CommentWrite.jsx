import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function CommentWrite({ hospitalId }) {
  const [comment, setComment] = useState("");

  function handleCommentSubmitClick() {
    axios
      .post("/api/place/comment/add", { hospitalId, comment })
      .then((res) => {})
      .catch()
      .finally();
  }

  return (
    <Box>
      <Textarea
        placeholder="리뷰를 남겨주세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={handleCommentSubmitClick} colorScheme="blue">
        아이콘
      </Button>
    </Box>
  );
}
