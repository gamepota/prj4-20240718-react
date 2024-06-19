import React, { useContext, useState } from "react";
import { Box, Button, Flex, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import { LoginContext } from "../../diaryComponent/LoginProvider.jsx";

export function DiaryCommentWrite({ diaryId, setIsProcessing, isProcessing }) {
  const [comment, setComment] = useState("");
  const toast = useToast();
  const account = useContext(LoginContext);

  const handleDiaryCommentSubmitClick = () => {
    setIsProcessing(true);
    axios
      .post("/api/diaryComment/add", {
        diaryId,
        comment,
        memberId: account.id,
      })
      .then((res) => {
        setComment("");
        toast({
          status: "success",
          position: "top",
          description: "방명록이 등록되었습니다.",
        });
        setIsProcessing(false);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        toast({
          status: "error",
          position: "top",
          description: "댓글 등록 중 오류가 발생했습니다.",
        });
        setIsProcessing(false);
      });
  };

  return (
    <Flex gap={2}>
      <Box flex={1}>
        <Box>
          <Textarea
            isDisabled={!account.isLoggedIn()}
            placeholder={"방명록을 작성해보세요"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>
        <Box>
          <Button
            onClick={handleDiaryCommentSubmitClick}
            colorScheme={"blue"}
            isLoading={isProcessing}
            isDisabled={
              !account.isLoggedIn() || !comment.trim() || isProcessing
            }
          >
            등록
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}
