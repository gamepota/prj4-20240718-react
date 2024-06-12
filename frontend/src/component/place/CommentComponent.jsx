import { Box } from "@chakra-ui/react";
import { CommentList } from "./CommentList.jsx";
import { CommentWrite } from "./CommentWrite.jsx";
import { useState } from "react";

export function CommentComponent({ hospitalId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  return (
    <Box>
      <CommentWrite
        hospitalId={hospitalId}
        isSending={isProcessing}
        setIsSending={setIsProcessing}
      />
      <CommentList
        hospitalId={hospitalId}
        setIsProcessing={setIsProcessing}
        isProcessing={isProcessing}
      />
    </Box>
  );
}
