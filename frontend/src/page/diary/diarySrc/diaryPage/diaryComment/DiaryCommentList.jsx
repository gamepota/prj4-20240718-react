import { Card, CardBody, Stack, StackDivider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DiaryCommentItem } from "./DiaryCommentItem.jsx";

export function DiaryCommentList({ diaryId, isProcessing, setIsProcessing }) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (diaryId && !isProcessing) {
      axios
        .get(`/api/diaryComment/list/${diaryId}`)
        .then((res) => {
          setCommentList(res.data);
        })
        .catch(() => {})
        .finally(() => {});
    }
  }, [isProcessing, isProcessing, diaryId]);

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
