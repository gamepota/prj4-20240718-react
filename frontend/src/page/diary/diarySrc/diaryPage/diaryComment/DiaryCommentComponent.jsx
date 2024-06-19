import React, { useEffect, useState } from "react";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import DiaryCommentList from "./DiaryCommentList";
import DiaryCommentWrite from "./DiaryCommentWrite";
import axios from "axios";

function DiaryCommentComponent() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [diary, setDiary] = useState(null);

  useEffect(() => {
    const id = 1; // 예시로 ID를 설정합니다.
    axios
      .get(`/api/diaryComment/${id}`)
      .then((res) => setDiary(res.data))
      .catch((error) => {
        console.error("Error fetching diary data:", error);
      });
  }, []);

  if (!diary) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={7}>
        <Heading>{diary.title || "Title"}</Heading>
      </Box>
      <Box mb={7}>
        <DiaryCommentWrite
          diaryId={diary.id}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      </Box>
      <Box mb={7}>
        <DiaryCommentList
          diaryId={diary.id}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      </Box>
    </Box>
  );
}

export default DiaryCommentComponent;
