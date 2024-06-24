import { Card, CardBody, Stack, StackDivider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DiaryCommentItem } from "./DiaryCommentItem.jsx";
import { DiaryCommentWrite } from "./DiaryCommentWrite.jsx";
import { useParams } from "react-router-dom";

export function DiaryCommentList() {
  const [commentList, setCommentList] = useState([]);
  const { id } = useParams();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (id && !isProcessing) {
      axios
        .get(`/api/diaryComment/list/${id}`)
        .then((res) => {
          setCommentList(res.data);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
  }, [id, isProcessing]);

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
            id={id}
          />
        </Stack>
      </CardBody>
    </Card>
  );
}
