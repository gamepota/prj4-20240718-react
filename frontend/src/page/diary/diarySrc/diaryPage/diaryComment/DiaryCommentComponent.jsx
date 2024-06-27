import { DiaryCommentWrite } from "./DiaryCommentWrite.jsx";
import { DiaryCommentList } from "./DiaryCommentList.jsx";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

export function DiaryCommentComponent({ diaryCommentId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  return (
    <Box>
      <Box>
        <DiaryCommentWrite
          diaryCommentId={diaryCommentId}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      </Box>
      <Box>
        <DiaryCommentList
          diaryCommentId={diaryCommentId}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      </Box>
    </Box>
  );
}

// 테스트 용
