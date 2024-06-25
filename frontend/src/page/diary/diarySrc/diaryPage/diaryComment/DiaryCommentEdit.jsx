import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";

export function DiaryCommentEdit() {
  const { id } = useParams();
  const [diaryComment, setDiaryComment] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const access = memberInfo.access;
  const nickname = memberInfo.nickname;
  const isLoggedIn = Boolean(access);

  function handleCommentSubmit() {
    axios
      .put(`/api/diaryComment/diaryUpdate`, {
        id: diaryComment.id,
        nickname: memberInfo.nickname,
        comment: diaryComment.comment,
      })
      .then(() => {
        toast({
          status: "success",
          description: "댓글이 수정되었습니다.",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description: "방명록이 수정되지 않았습니다.",
            position: "top",
          });
        }
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
      <Box>방명록 수정</Box>
      <Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input
              defaultValue={memberInfo.nickname}
              onChange={(e) =>
                setMemberInfo({ ...memberInfo, nickname: e.target.value })
              }
            />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>방명록 작성글</FormLabel>
            <Textarea
              defaultValue={diaryComment.comment}
              onChange={(e) =>
                setDiaryComment({ ...diaryComment, comment: e.target.value })
              }
            ></Textarea>
          </FormControl>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody>저장하시겠습니까?</ModalBody>
            <ModalFooter>
              <Button onClick={handleCommentSubmit} colorScheme={"blue"}>
                확인
              </Button>
              <Button onClick={onClose}>취소</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}
