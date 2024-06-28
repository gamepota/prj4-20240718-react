import { Box, Spinner } from "@chakra-ui/react";
import { DiaryCommentComponent } from "./DiaryCommentComponent.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { generateDiaryId } from "../../../../../util/util.jsx";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";

export function DiaryComment() {
  const { id } = useParams();
  const [diaryId, DiaryId] = useState(null);
  const { memberInfo, setMemberInfo } = useContext(LoginContext);

  // useEffect(() => {
  //   const userId = extractUserIdFromDiaryId(id);
  //   axios.get(`/api/diaryComment/${userId}`).then((res) => DiaryId(res.data));
  // }, []);
  useEffect(() => {
    const diaryId = generateDiaryId(memberInfo.id);
    axios.get(`/api/diaryComment/${diaryId}`).then((res) => DiaryId(res.data));
  }, []);

  if (DiaryId == null) {
    return <Spinner />;
  }

  return (
    <Box>
      <DiaryCommentComponent diaryId={diaryId} />
    </Box>
  );
}
//테스트 완료
