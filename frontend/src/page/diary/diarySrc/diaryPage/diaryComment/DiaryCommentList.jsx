import { Card, CardBody, Stack, StackDivider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DiaryCommentItem } from "./DiaryCommentItem.jsx";
import { DiaryCommentWrite } from "./DiaryCommentWrite.jsx";

export function DiaryCommentList({ diaryId, isProcessing, setIsProcessing }) {
  const [commentList, setCommentList] = useState([]);
  console.log(isProcessing);
  console.log(setIsProcessing);
  useEffect(() => {
    if (diaryId && !isProcessing) {
      axios
        .get(`/api/diaryComment/list/${diaryId}`)
        .then((res) => {
          setCommentList(res.data);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
  }, [diaryId, isProcessing]);

  return (
    <Card>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={4}>
          {commentList.map((diaryComment) => (
            <DiaryCommentItem
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              diaryComment={diaryComment}
              key={diaryComment.id}
            />
          ))}
          <DiaryCommentWrite
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            diaryId={diaryId}
          />
        </Stack>
      </CardBody>
    </Card>
  );
}
