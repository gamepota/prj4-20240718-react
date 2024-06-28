import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { generateDiaryId } from "../../../../../util/util.jsx";

export function DiaryCommentWrite() {
  const { id } = useParams();
  const [diaryComment, setDiaryComment] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const access = memberInfo.access;
  const nickname = memberInfo.nickname;
  const isLoggedIn = Boolean(access);
  const navigate = useNavigate();
  const diaryId = generateDiaryId(memberInfo.id);

  const handleDiaryCommentSubmitClick = () => {
    setLoading(true);
    axios
      .post("/api/diaryComment/add", {
        id,
        nickname,
        memberId: memberInfo.id,
        comment,
      })
      .then((res) => {
        toast({
          status: "success",
          position: "top",
          description: "방명록이 등록되었습니다.",
        });
        navigate(`/diary/${diaryId}/comment/list`);
      })
      .catch((e) => {
        const code = e.response.status;

        if (code === 400) {
          toast({
            status: "error",
            position: "top",
            description: "방명록 등록 중 오류가 발생했습니다.",
          });
        }
      })
      .finally(() => setLoading(false));
  };
  let disableSaveButton = false;
  if (comment.trim().length === 0) {
    disableSaveButton = true;
  }
  if (!memberInfo) {
    return null; // 또는 로딩 스피너를 표시할 수 있습니다.
  }

  return (
    <Box>
      <Box mb={10}>방명록 작성</Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={memberInfo.nickname} readOnly />
        </FormControl>
      </Box>
      <Box mb={7}>
        <FormControl>
          <FormLabel>내용</FormLabel>
          <Textarea onChange={(e) => setComment(e.target.value)} />
        </FormControl>
      </Box>
      <Button
        isLoading={loading}
        isDisabled={disableSaveButton}
        colorScheme={"blue"}
        onClick={handleDiaryCommentSubmitClick}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </Box>
  );
}
