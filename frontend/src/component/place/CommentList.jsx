import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Spacer } from "@chakra-ui/react";

export function CommentList({ hospitalId, isSending }) {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    axios;
    if (!isSending) {
      axios
        .get(`/api/comment/list/${hospitalId}`)
        .then((res) => {
          setCommentList(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {});
    }
  }, [isSending]);
  if (commentList.length === 0) {
    return <Box>댓글이 없습니다. 첫 댓글을 작성해보세요.</Box>;
  }
  return (
    <Box>
      {commentList.map((comment) => (
        <Box key={comment.id} border={"1px solid black"} my={3}>
          <Flex>
            <Box>{comment.memberId}</Box>
            <Spacer />
            <Box>{comment.inserted}</Box>
          </Flex>
          <Box>{comment.comment}</Box>
        </Box>
      ))}
    </Box>
  );
}
