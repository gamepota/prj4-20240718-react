import { Box, Button, Flex, Textarea, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../diaryComponent/LoginProvider.jsx";

export function DiaryCommentWrite({ diaryId, isProcessing, setIsProcessing }) {
  const [comment, setComment] = useState("");
  const toast = useToast();
  const account = useContext(LoginContext);

  function handleDiaryCommentSubmitClick() {
    setIsProcessing(true);
    axios
      .post("/api/diaryComment/add", {
        diaryId,
        comment,
      })
      .then((res) => {
        setComment("");
        toast({
          status: "success",
          position: "top",
          description: "방명록이 등록되었습니다.",
        });
      })
      .catch(() => {})
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Flex gap={2}>
      <Box flex={1}>
        <Textarea
          isDisabled={!account.isLoggedIn()}
          placeholder={"방명록을 작성해보세요"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          onClick={handleDiaryCommentSubmitClick}
          colorScheme={"blue"}
          isLoading={isProcessing}
        >
          등록
        </Button>
      </Box>
    </Flex>
  );
}
