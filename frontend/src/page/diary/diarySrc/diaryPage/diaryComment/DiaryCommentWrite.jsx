import React, { useContext, useState } from "react";
import { Box, Button, Flex, Input, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import { LoginContext } from "../../diaryComponent/LoginProvider.jsx";

export function DiaryCommentWrite() {
  const [comment, setComment] = useState("");
  const toast = useToast();
  const account = useContext(LoginContext);
  const [loading, setLoading] = useState(false);

  const handleDiaryCommentSubmitClick = () => {
    setLoading(true);
    axios
      .post("/api/diaryComment/add", {
        comment,
        username: account.id,
      })
      .then((res) => {
        setComment("");
        toast({
          status: "success",
          position: "top",
          description: "방명록이 등록되었습니다.",
        });
      })
      .catch((e) => {
        const code = e.response.status;

        if (code === 400) {
          toast({
            status: "error",
            position: "top",
            description: "댓글 등록 중 오류가 발생했습니다.",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Flex gap={2}>
      <Box flex={1}>
        <Box>
          <Input value={account.id} readOnly />
          <Textarea
            isDisabled={!account.isLoggedIn()}
            placeholder={"방명록을 작성해보세요"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>
        <Box>
          <Button
            isLoading={loading}
            onClick={handleDiaryCommentSubmitClick}
            colorScheme={"blue"}
            isDisabled={!account.isLoggedIn() || !comment.trim()}
          >
            등록
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}
