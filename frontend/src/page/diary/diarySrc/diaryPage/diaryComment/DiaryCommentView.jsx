import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { generateDiaryId } from "../../../../../util/util.jsx";

export function DiaryCommentView() {
  const { id } = useParams();
  console.log(id);
  const [diaryComment, setDiaryComment] = useState(null);
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const access = memberInfo.access;
  const isLoggedIn = Boolean(access);
  const toast = useToast();
  const navigate = useNavigate();
  const memberId = memberInfo && memberInfo.id ? parseInt(memberInfo.id) : null;
  const params = memberId ? { memberId } : {};
  const { onOpen, onClose, isOpen } = useDisclosure();
  const diaryId = generateDiaryId(memberInfo.id);

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
          navigate(`/diary/${diaryId}/comment/list`);
        }
      });
  }, [id]);

  function handleClickRemove() {
    axios
      .delete(`/api/diaryComment` + diaryComment.id, { params })
      .then(() => {
        toast({
          status: "success",
          description: "삭제가 완료되었습니다.",
          position: "top",
        });
      })
      .catch(() => {
        toast({
          status: "error",
          description: "삭제 중 오류가 발생하였습니다.",
          position: "top",
        });
      })
      .finally(() => {
        onClose();
      });
  }

  if (diaryComment === null) {
    return <Spinner />;
  }

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
      <DiaryCommentComponent diaryCommentId={diaryComment.id} />
      <Box mb={7}>
        <FormControl>작성일시</FormControl>
        <Input type="datetime-local" value={diaryComment.inserted} readOnly />
      </Box>
      <Button colorScheme={"purple"}>수정</Button>
      <Button onClick={handleClickRemove}>삭제</Button>
    </Box>
  );
}
