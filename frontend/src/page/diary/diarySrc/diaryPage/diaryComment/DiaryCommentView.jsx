import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

export function DiaryCommentView() {
  const { id } = useParams();
  const [diaryComment, setDiaryComment] = useState(null);
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const access = memberInfo.access;
  const isLoggedIn = Boolean(access);
  const toast = useToast();
  const navigate = useNavigate();
  // const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/diaryComment/${id}`)
      .then((res) => setDiaryComment(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다.",
            position: "top",
          });
          navigate("diary/comment/list");
        }
      })
      .finally(() => {});
  }, [id]);

  return (
    <Box>
      <Box>방 명 록</Box>
      <Box mb={7}>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={memberInfo.nickname} readOnly />
        </FormControl>
      </Box>
      <Box mb={7}>
        <FormControl>
          <FormLabel>방명록</FormLabel>
          <Textarea value={diaryComment.comment} readOnly />
        </FormControl>
      </Box>
      <Box mb={7}>
        <FormControl>작성일시</FormControl>
        <Input type="datetime-local" value={diaryComment.inserted} readOnly />
      </Box>
    </Box>
  );
}
