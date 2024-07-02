import { Box, Spinner, Center } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import { DiaryCommentWrite } from "./DiaryCommentWrite.jsx";
import { DiaryCommentList } from "./DiaryCommentList.jsx";

export function DiaryCommentComponent({ diaryId }) {
  const { memberInfo } = useContext(LoginContext);
  const [diaryCommentList, setDiaryCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/diaryComment/list`, {
          params: { diaryId },
        });
        setDiaryCommentList(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [diaryId]);

  const handleCommentAdded = (newComment) => {
    setDiaryCommentList([newComment, ...diaryCommentList]); // 새로운 댓글을 맨 위에 추가
  };

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box>
      <DiaryCommentWrite onCommentAdded={handleCommentAdded} />
      <DiaryCommentList diaryCommentList={diaryCommentList} />
    </Box>
  );
}
