import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function DiaryCommentWrite({ boardId, isProcessing, setIsProcessing }) {
  const [comment, setComment] = useState("");

  function handleDiaryCommentSubmitClick() {
    axios
      .post("/api/diaryComment/commentAdd", {
        boardId,
        comment,
      })
      .then((res) => {})
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <Flex>
      <Box flex={1}>
        <Textarea
          placeholder="방명록을 작성해보세요!"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={handleDiaryCommentSubmitClick} colorScheme={"blue"}>
          등록
        </Button>
      </Box>
    </Flex>
  );
}
