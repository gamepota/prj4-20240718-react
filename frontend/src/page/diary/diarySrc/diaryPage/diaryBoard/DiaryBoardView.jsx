import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
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

export function DiaryBoardView() {
  const { id } = useParams();
  const [diary, setDiary] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/diaryBoard/${id}`)
      .then((res) => setDiary(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "error",
            description: "해당 게시물이 존재하지 않습니다.",
            position: "top",
          });
          navigate("/");
        }
      });
  }, []);

  function handleClickRemove() {
    axios
      .delete(`/api/diaryBoard/${id}`)
      .then(() => {
        toast({
          status: "success",
          description: `${id}번 게시물이 삭제되었습니다.`,
          position: "top",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          description: `${id}번 게시물 삭제 중 오류가 발생하였습니다.`,
          position: "top",
        });
      })
      .finally(() => {
        onClose();
      });
  }

  if (diary === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>{diary.id}번 게시물</Box>
      <Box>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea value={diary.content} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={diary.writer} />
        </FormControl>
        <FormControl>
          <FormLabel>작성일시</FormLabel>
          <Input type="datetime-local" value={diary.inserted} readOnly />
        </FormControl>
        <Button
          onClick={() => navigate(`/diary/edit/${diary.id}`)}
          colorScheme="purple"
        >
          수정
        </Button>
        <Button colorScheme="red" onClick={onOpen}>
          삭제
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>게시물 삭제</ModalHeader>
            <ModalBody>삭제하시겠습니까?</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>취소</Button>
              <Button colorScheme="red" onClick={handleClickRemove}>
                확인
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}
