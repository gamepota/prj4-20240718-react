import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export function CommentWrite({ hospitalId, isSending, setIsSending }) {
  const [comment, setComment] = useState("");

  function handleCommentSubmitClick() {
    setIsSending(true);
    axios
      .post("/api/hospitalComment/add", {
        hospitalId,
        comment,
      })
      .then((res) => {})
      .catch()
      .finally(() => {
        setIsSending(false);
      });
  }

  return (
    <Box>
      <Textarea
        placeholder="리뷰를 남겨주세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        isLoading={isSending}
        onClick={handleCommentSubmitClick}
        colorScheme="blue"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </Box>
  );
}
