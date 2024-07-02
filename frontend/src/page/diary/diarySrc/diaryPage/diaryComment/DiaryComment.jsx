import { Box, Spinner } from "@chakra-ui/react";
import { DiaryCommentWrite } from "./DiaryCommentWrite.jsx";
import { DiaryCommentList } from "./DiaryCommentList.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { generateDiaryId } from "../../../../../util/util.jsx";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";

export function DiaryComment() {
  const { id } = useParams();
  const [diaryCommentList, setDiaryCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { memberInfo } = useContext(LoginContext);

  useEffect(() => {
    const diaryId = generateDiaryId(memberInfo.id);
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/diaryComment/list`, {
          params: { diaryId },
        });
        setDiaryCommentList(res.data);
        console.log("Comments fetched:", res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [id, memberInfo.id]);

  const handleCommentAdded = (newComment) => {
    setDiaryCommentList((prevList) => [newComment, ...prevList]); // 새로운 댓글을 맨 위에 추가
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box>
      {/*{Number(memberInfo.id) === Number(diaryCommentList.id)?(*/}
      {/*<DiaryCommentWrite onCommentAdded={handleCommentAdded} diaryCommentList={diaryCommentList}/>):null}*/}
      <DiaryCommentWrite
        onCommentAdded={handleCommentAdded}
        diaryCommentList={diaryCommentList}
      />
      <DiaryCommentList diaryCommentList={diaryCommentList} />
    </Box>
  );
}
