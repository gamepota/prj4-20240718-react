import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Image,
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
import { LoginContext } from "../../diaryComponent/LoginProvider.jsx";

export function DiaryBoardView() {
  const { id } = useParams();
  const [diary, setDiary] = useState(null);
  const account = useContext(LoginContext);
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
            status: "info",
            description: "해당 게시물이 존재하지 않습니다.",
            position: "top",
          });
          navigate("/diary/home");
        }
      });
  }, [id, navigate, toast]);

  function handleClickRemove() {
    axios
      .delete(`/api/diaryBoard/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then(() => {
        toast({
          status: "success",
          description: `$게시물이 삭제되었습니다.`,
          position: "top",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          description: `게시물 삭제 중 오류가 발생하였습니다.`,
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
      <Box>게시물</Box>
      <Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input value={diary.title} readOnly />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea value={diary.content} readOnly />
          </FormControl>
        </Box>
        <Box>
          {diary.imageSrcList &&
            diary.imageSrcList.map((src) => (
              <Box border={"2px solid black"} m={3} key={src}>
                <Image src={src} />
              </Box>
            ))}
        </Box>
        <Box mb={7}>
          {diary.fileList &&
            diary.fileList.map((file) => (
              <Card m={3} key={file.name}>
                <CardBody>
                  <Image w={"100%"} src={file.src} />
                </CardBody>
              </Card>
            ))}
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input value={diary.writer} readOnly />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>작성일시</FormControl>
          <Input type="datetime-local" value={diary.inserted} readOnly />
        </Box>
        <Flex mb={7} gap={2}>
          <Button
            onClick={() => navigate(`/diary/edit/${diary.id}`)}
            colorScheme="purple"
          >
            수정
          </Button>
          <Button colorScheme="red" onClick={onOpen}>
            삭제
          </Button>
        </Flex>

        <Box mb={20}></Box>
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
