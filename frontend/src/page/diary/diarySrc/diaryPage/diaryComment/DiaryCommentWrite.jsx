import React, { useState } from "react";
import { Box, Button, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import { generateDiaryId } from "../../../../../util/util.jsx";
import { useParams } from "react-router-dom";

export function DiaryCommentWrite({ onCommentAdded }) {
  const [comment, setComment] = useState("");
  const toast = useToast();
  const { id } = useParams();

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      toast({
        description: "댓글 내용을 입력해주세요.",
        status: "warning",
        position: "top",
      });
      return;
    }

    try {
      const diaryId = generateDiaryId(id);
      const res = await axios.post(`/api/diaryComment/add`, { diaryId, comment });
      onCommentAdded(res.data);
      setComment("");
      toast({
        description: "댓글이 추가되었습니다.",
        status: "success",
        position: "top",
      });
    } catch (err) {
      console.error("Error adding comment:", err);
      toast({
        description: "댓글 추가 중 오류가 발생했습니다.",
        status: "error",
        position: "top",
      });
    }
  };

  return (
    <Box my={5}>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력하세요..."
      />
      <Button mt={2} colorScheme="blue" onClick={handleCommentSubmit}>
        댓글 추가
      </Button>
    </Box>
  );
}
