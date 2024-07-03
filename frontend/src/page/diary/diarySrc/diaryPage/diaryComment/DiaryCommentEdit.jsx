import {
  Box,
  Button,
  Center,
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
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import { generateDiaryId } from "../../../../../util/util.jsx";

export function DiaryCommentEdit() {
  const { id } = useParams();
  const [diaryComment, setDiaryComment] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const access = memberInfo.access;
  const nickname = memberInfo.nickname;
  const isLoggedIn = Boolean(access);
  const navigate = useNavigate();
  const diaryId = generateDiaryId(memberInfo.id);
  console.log(diaryComment.id);

  useEffect(() => {
    axios
      .get(`/api/diaryComment/${id}`)
      .then((res) => setDiaryComment(res.data));
  }, [id]);

  function handleCommentSubmit() {
    axios
      .put(`/api/diaryComment/edit`, {
        id: diaryComment.id,
        nickname: memberInfo.nickname,
        comment: diaryComment.comment,
        memberId: memberInfo.id,
      })
      .then(() => {
        toast({
          status: "success",
          description: "댓글이 수정되었습니다.",
          position: "top",
        });
        navigate(`/diary/${diaryId}/comment/view/${id}`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description: "댓글이 수정되지 않았습니다.",
            position: "top",
          });
        }
      })
      .finally(() => {
        onClose();
      });
  }

  if (diaryComment === null) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={10}
      p={5}
      boxShadow="md"
      borderRadius="md"
      bg="white"
    >
      <Box mb={10}>
        <Text fontSize="xl" fontWeight="bold">
          방명록 수정
        </Text>
      </Box>
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
              key={diaryComment.id}
              onChange={(e) =>
                setDiaryComment({ ...diaryComment, comment: e.target.value })
              }
            ></Textarea>
            <Button onClick={onOpen}>저장</Button>
          </FormControl>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>확인</ModalHeader>
            <ModalBody>저장하시겠습니까?</ModalBody>
            <ModalFooter>
              <Button onClick={handleCommentSubmit} colorScheme="blue">
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
