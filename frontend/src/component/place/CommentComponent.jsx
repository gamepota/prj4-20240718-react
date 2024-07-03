import { Box, Button, Tooltip } from "@chakra-ui/react";
import { CommentList } from "./CommentList.jsx";
import { CommentWrite } from "./CommentWrite.jsx";
import React, { useContext, useState } from "react";
import { LoginContext } from "../LoginProvider.jsx";

export function CommentComponent({ hospitalId }) {
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
          {showCommentWrite ? "댓글 취소" : "댓글 달기"}
        </Button>
      </Tooltip>
      <CommentList
        hospitalId={hospitalId}
        setIsProcessing={setIsProcessing}
        isProcessing={isProcessing}
      />

      {showCommentWrite && memberInfo && (
        <CommentWrite
          hospitalId={hospitalId}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          onCommentSubmit={() => setShowCommentWrite(false)}
          memberId={memberId}
        />
      )}
    </Box>
  );
}
