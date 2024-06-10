import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function BoardView() {
  const { id } = useParams();
  console.log(id);
  const [board, setBoard] = useState(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => {
        console.log(res.data);
        setBoard(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다",
            position: "top",
            duration: "500",
          });
        }
      });
  }, [id]);
  if (board === null) {
    return <Spinner />;
  }

  function handleClickRemove() {
    axios
      .delete("/api/board/" + board.id)
      .then(() => {
        toast({
          status: "success",
          description: `${id}번 게시물이 삭제되었습니다`,
          position: "top",
        });
        navigate(`/`);
      })
      .finally(() => onClose);
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
          <Input value={board.content} readOnly />
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
          <FormLabel>작성 일자</FormLabel>
          <Input type={"datetime-local"} value={board.inserted} readOnly />
        </FormControl>
      </Box>
      <Box>
        <Button colorScheme={"purple"}>수정</Button>
        <Button colorScheme={"red"} onClick={onOpen}>
          삭제
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제하시곘습니까?</ModalBody>
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
