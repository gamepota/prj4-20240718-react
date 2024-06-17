import React, { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { DiaryCommentList } from "./DiaryCommentList.jsx";
import { DiaryCommentWrite } from "./DiaryCommentWrite.jsx";

function DiaryCommentComponent({ diaryId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  return (
    <Box>
      <Box mb={7}>
        <Heading>what</Heading>
      </Box>
      <Box mb={7}>
        <DiaryCommentWrite
          boardId={diaryId}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      </Box>
      <Box mb={7}>
        <DiaryCommentList
          diaryId={diaryId}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      </Box>
    </Box>
  );
}

export default DiaryCommentComponent;
