import React, { useContext, useState } from "react";
import { Box, Button, Tooltip } from "@chakra-ui/react";
import { BoardCommentWrite } from "./BoardCommentWrite.jsx";
import { BoardCommentList } from "./BoardCommentList.jsx";
import { LoginContext } from "../LoginProvider.jsx";

export function BoardCommentComponent({ boardId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCommentWrite, setShowCommentWrite] = useState(false);
  const { memberInfo } = useContext(LoginContext);
  const memberId = memberInfo && memberInfo.id ? parseInt(memberInfo.id) : null;

  const handleCommentButtonClick = () => {
    if (memberInfo) {
      setShowCommentWrite(!showCommentWrite);
    }
  };

  return (
    <Box>
      <Tooltip
        isDisabled={!!memberInfo}
        hasArrow
        label="로그인 해주세요."
        placement="top"
      >
        <Button
          onClick={handleCommentButtonClick}
          mb={4}
          colorScheme="blue"
          isDisabled={!memberInfo}
        >
          {showCommentWrite ? "댓글 작성 취소" : "댓글 작성"}
        </Button>
      </Tooltip>

      {showCommentWrite && memberInfo && (
        <BoardCommentWrite
          boardId={boardId}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          onCommentSubmit={() => setShowCommentWrite(false)}
          memberId={memberId}
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
