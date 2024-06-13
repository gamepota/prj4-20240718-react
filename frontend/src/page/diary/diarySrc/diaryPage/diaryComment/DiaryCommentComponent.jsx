import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { DiaryCommentList } from "./DiaryCommentList.jsx";
import { DiaryCommentWrite } from "./DiaryCommentWrite.jsx";

function DiaryCommentComponent({ boardId }) {
  return (
    <Box>
      <Box mb={7}>
        <Heading>what</Heading>
      </Box>
      <Box mb={7}>
        <DiaryCommentWrite />
        boardId={boardId}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      </Box>
      <Box mb={7}>
        <DiaryCommentList
          boardId={boardId}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      </Box>
    </Box>
  );
}

export default DiaryCommentComponent;
