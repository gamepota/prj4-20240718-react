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
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import { generateDiaryId } from "../../../../../util/util.jsx";

export function DiaryBoardView() {
  const { id } = useParams();
  const [diaryBoard, setDiaryBoard] = useState(null);
  const { memberInfo } = useContext(LoginContext);
  const nickname = memberInfo?.nickname || null;
  const access = memberInfo?.access || null;
  const isLoggedIn = Boolean(access);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const memberId = memberInfo && memberInfo.id ? parseInt(memberInfo.id) : null;
  const params = memberId ? { memberId } : {};
  const diaryId = generateDiaryId(memberInfo.id);
  useEffect(() => {
    axios
      .get(`/api/diaryBoard/${id}`)
      .then((res) => {
        console.log(res.data);
        setDiaryBoard(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다.",
            position: "top",
          });
          navigate(`/diary/${diaryId}/list`);
        }
      });
  }, [id]);

  function handleClickRemove() {
    axios
      .delete("/api/diaryBoard/" + diaryBoard.id, { params })
      .then(() => {
        toast({
          status: "success",
          description: `${id} 게시물이 삭제되었습니다.`,
          position: "top",
        });
        navigate(`/diary/${diaryId}/list`);
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
    console.log(diaryBoard.id);
  }

  if (diaryBoard === null) {
    return <Spinner />;
  }

  function handleDiaryEdit() {
    const diaryId = generateDiaryId(memberInfo.id);
    navigate(`/diary/${diaryId}/edit/${id}`);
  }

  return (
    <Box>
      <Box>{diaryBoard.id}번째 일기</Box>
      <Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input value={diaryBoard.title} readOnly />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea value={diaryBoard.content} readOnly />
          </FormControl>
        </Box>
        <Box mb={7}>
          {diaryBoard.fileList &&
            diaryBoard.fileList.map((file) => (
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
            <Input value={diaryBoard.writer} readOnly />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>작성일시</FormControl>
          <Input type="datetime-local" value={diaryBoard.inserted} readOnly />
        </Box>
        <Flex mb={7} gap={2}>
          <Button onClick={handleDiaryEdit} colorScheme="purple">
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
