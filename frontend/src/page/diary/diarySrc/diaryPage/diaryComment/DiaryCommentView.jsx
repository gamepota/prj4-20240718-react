import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { generateDiaryId } from "../../../../../util/util.jsx";

export function DiaryCommentView() {
  const { id } = useParams();
  const [diaryComment, setDiaryComment] = useState(null);
  const { memberInfo } = useContext(LoginContext);
  const access = memberInfo?.access;
  const isLoggedIn = Boolean(access);
  const toast = useToast();
  const navigate = useNavigate();
  const memberId = memberInfo && memberInfo.id ? parseInt(memberInfo.id) : null;
  const params = memberId ? { memberId } : {};
  const { onOpen, onClose, isOpen } = useDisclosure();
  const diaryId = generateDiaryId(memberInfo.id);
  console.log(id);
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
          navigate(`/diary/${diaryId}/comment`);
        }
      });
  }, [id]);

  function handleClickRemove() {
    axios
      .delete(`/api/diaryComment/${diaryComment.id}`, { params })
      .then(() => {
        toast({
          status: "success",
          description: "삭제가 완료되었습니다.",
          position: "top",
        });
        navigate(`/diary/${diaryId}/comment`);
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
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  function handleCommentEdit() {
    const diaryId = generateDiaryId(memberInfo.id);
    navigate(`/diary/${diaryId}/comment/edit/${diaryComment.id}`);
  }

  return (
    <Center bg="gray.100" py={20}>
      <Box w="800px" bg="white" boxShadow="lg" borderRadius="md" p={6}>
        <Card w="100%" variant="outline">
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold" fontSize="2xl" color="teal.500">
                  방명록
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize="lg" color="gray.600">
                  {diaryComment.nickname} 님이 남긴 방명록이에요!
                </Text>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel fontWeight="bold">방명록</FormLabel>
                  <Textarea value={diaryComment.comment} readOnly />
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel fontWeight="bold">작성일시</FormLabel>
                  <Input
                    type="datetime-local"
                    value={diaryComment.inserted}
                    readOnly
                  />
                </FormControl>
              </Box>
              <HStack spacing={4} justifyContent="flex-end">
                <Button colorScheme="purple" onClick={handleCommentEdit}>
                  수정
                </Button>
                <Button colorScheme="red" onClick={handleClickRemove}>
                  삭제
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    </Center>
  );
}
