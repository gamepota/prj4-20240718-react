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

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다.",
            position: "top",
          });
          navigate("/");
        }
      });
  }, [id]); // 'id'를 의존성 배열에 추가

  if (board === null) {
    return <Spinner />;
  }

  function handleClickRemove() {
    axios
      .delete(`/api/board/${id}`)
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

  return (
    <Box>
      <Box>{board.id}번 게시물</Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={board.title} readOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea value={board.content} readOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={board.writer} readOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성일시</FormLabel>
          <Input type={"datetime-local"} value={board.inserted} readOnly />
        </FormControl>
      </Box>
      <Box>
        <Button colorScheme={"red"} onClick={onOpen}>
          삭제
        </Button>
        <Button
          colorScheme={"blue"}
          onClick={() => navigate(`/edit/${board.id}`)}
        >
          수정
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>게시물 삭제</ModalHeader>
          <ModalBody>삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button colorScheme={"red"} onClick={handleClickRemove}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
