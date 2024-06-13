import { Card, CardBody, Stack, StackDivider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DiaryCommentItem } from "./DiaryCommentItem.jsx";

export function DiaryCommentList({ boardId, isProcessing, setIsProcessing }) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (!isProcessing) {
      axios
        .get(`/api/comment/list/${boardId}`)
        .then((res) => {
          setCommentList(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {});
    }
  }, [isProcessing]);

  return (
    <Card>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={4}>
          {commentList.map((comment) => (
            <DiaryCommentItem
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              comment={comment}
              key={comment.id}
            />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}
