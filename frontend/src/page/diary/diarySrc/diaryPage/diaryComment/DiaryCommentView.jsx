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
  Input,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
  HStack,
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
            description: "해당 댓글이 존재하지 않습니다.",
            position: "top",
          });
          navigate(`/diary/${diaryId}/comment/list`);
        }
      });
  }, [id]);

  function handleClickRemove() {
    axios
      .delete(`/api/diaryComment/${diaryComment.id}`, { params: { memberId: memberInfo.id } })
      .then(() => {
        toast({
          status: "success",
          description: "댓글이 삭제되었습니다.",
          position: "top",
        });
        navigate(`/diary/${diaryId}/comment/list`);
      })
      .catch(() => {
        toast({
          status: "error",
          description: "댓글 삭제 중 오류가 발생했습니다.",
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

  return (
    <Center bg="gray.100" py={20}>
      <Box w="800px" bg="white" boxShadow="lg" borderRadius="md" p={6}>
        <Card w="100%" variant="outline">
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold" fontSize="2xl" color="teal.500">
                방명록
              </Text>
              <Text fontWeight="bold" fontSize="lg" color="gray.600">
                {diaryComment.nickname} 님이 남긴 방명록
              </Text>
              <FormControl>
                <FormLabel fontWeight="bold">방명록</FormLabel>
                <Textarea value={diaryComment.comment} readOnly />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold">작성일시</FormLabel>
                <Input type="datetime-local" value={diaryComment.inserted} readOnly />
              </FormControl>
              {isLoggedIn && (
                <HStack spacing={4} justifyContent="flex-end">
                  <Button colorScheme="red" onClick={onOpen}>
                    삭제
                  </Button>
                </HStack>
              )}
            </VStack>
          </CardBody>
        </Card>
      </Box>
    </Center>
  );
}
