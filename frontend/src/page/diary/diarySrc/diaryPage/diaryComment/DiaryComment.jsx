import { Box, Spinner } from "@chakra-ui/react";
import { DiaryCommentComponent } from "./DiaryCommentComponent.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { extractUserIdFromDiaryId } from "../../../../../util/util.jsx";

export function DiaryComment() {
  const { id } = useParams();
  const [diaryId, DiaryId] = useState(null);

  useEffect(() => {
    const userId = extractUserIdFromDiaryId(id);
    axios.get(`/api/diaryComment/${userId}`).then((res) => DiaryId(res.data));
  }, []);

  if (diaryId == null) {
    return <Spinner />;
  }

  return (
    <Box>
      <DiaryCommentComponent diaryCommentId={diaryId} />
    </Box>
  );
}
//테스트 완료
