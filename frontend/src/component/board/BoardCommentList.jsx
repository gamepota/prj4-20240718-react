import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { CommentItem } from "../place/CommentItem.jsx";

export function BoardCommentList({ boardId, isProcessing, setIsProcessing }) {
  const [boardCommentList, setBoardCommentList] = useState([]);
  useEffect(() => {
    if (!isProcessing) {
      axios
        .get(`/api/comment/list/${boardId}`)
        .then((res) => {
          setBoardCommentList(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }
  }, [isProcessing]);
  if (boardCommentList.length === 0) {
    return <Box>댓글이 없습니다</Box>;
  }
  return (
    <Box>
      {boardCommentList.map((comment) => (
        <CommentItem
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          comment={comment}
          key={comment.id}
        />
      ))}
    </Box>
  );
}
