import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import * as PropTypes from "prop-types";
import { CommentItem } from "./CommentItem.jsx";

CommentItem.propTypes = { comment: PropTypes.any };

export function CommentList({ hospitalId, isSending }) {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    axios;
    if (!isSending) {
      axios
        .get(`/api/hospitalComment/list/${hospitalId}`)
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
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </Box>
  );
}
