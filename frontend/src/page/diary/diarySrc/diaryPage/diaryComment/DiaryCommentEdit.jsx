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
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";

export function DiaryCommentEdit() {
  const { id } = useParams();
  const [diaryComment, setDiaryComment] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { memberInfo } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/diaryComment/${id}`)
      .then((res) => setDiaryComment(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 댓글이 존재하지 않습니다.",
            position: "top",
          });
          navigate("/path/to/redirect"); // 존재하지 않는 경우 리디렉션할 경로 설정
        }
      });
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
        navigate(`/path/to/comment/view/${diaryComment.id}`); // 수정 완료 후 리디렉션할 경로 설정
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
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box maxW="600px" mx="auto" mt={10} p={5} boxShadow="md" borderRadius="md" bg="white">
      <Box mb={10}>
        <Text fontSize="xl" fontWeight="bold">
          방명록 수정
        </Text>
      </Box>
      <Box>
        <FormControl mb={7}>
          <FormLabel>작성자</FormLabel>
          <Input value={memberInfo.nickname} readOnly />
        </FormControl>
        <FormControl mb={7}>
          <FormLabel>방명록 작성글</FormLabel>
          <Textarea
            defaultValue={diaryComment.comment}
            onChange={(e) =>
              setDiaryComment({ ...diaryComment, comment: e.target.value })
            }
          />
        </FormControl>
        <Button colorScheme="blue" onClick={onOpen}>
          저장
        </Button>
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
