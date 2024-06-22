import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { BoardCommentItem } from "./BoardCommentItem.jsx";

export function BoardCommentList({ boardId, isProcessing, setIsProcessing }) {
  const [boardCommentList, setBoardCommentList] = useState([]);
  useEffect(() => {
    if (!isProcessing) {
      axios
        .get(`/api/comment/list/${boardId}`)
        .then((res) => {
          // console.log(res.data);
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
        <BoardCommentItem
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          comment={comment}
          key={comment.id}
        />
      ))}
    </Box>
  );
}
