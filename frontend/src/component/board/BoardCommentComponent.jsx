import React, { useContext, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { BoardCommentWrite } from "./BoardCommentWrite.jsx";
import { BoardCommentList } from "./BoardCommentList.jsx";
import { LoginContext } from "../LoginProvider.jsx";

export function BoardCommentComponent({ boardId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCommentWrite, setShowCommentWrite] = useState(false);
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const memberId = memberInfo && memberInfo.id ? parseInt(memberInfo.id) : null;
  const params = memberId ? { memberId } : {};

  const handleCommentButtonClick = () => {
    setShowCommentWrite(!showCommentWrite);
  };

  return (
    <Box>
      <Button onClick={handleCommentButtonClick} mb={4} colorScheme="blue">
        {showCommentWrite ? "댓글 작성 취소" : "댓글 작성"}
      </Button>

      {showCommentWrite && (
        <BoardCommentWrite
          boardId={boardId}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          onCommentSubmit={() => setShowCommentWrite(false)}
        />
      )}

      <BoardCommentList
        boardId={boardId}
        setIsProcessing={setIsProcessing}
        isProcessing={isProcessing}
      />
    </Box>
  );
}
