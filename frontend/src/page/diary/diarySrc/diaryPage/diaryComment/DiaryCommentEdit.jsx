import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function DiaryCommentEdit({
  diaryComment,
  setIsEditing,
  isProcessing,
  setIsProcessing,
}) {
  const [commentText, setCommentText] = useState(diaryComment.comment);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  function handleCommentSubmit() {
    setIsProcessing(true);
    axios
      .put(`/api/diaryComment/diaryUpdate`, {
        id: diaryComment.id,
        diaryComment: commentText,
      })
      .then(() => {
        toast({
          status: "success",
          description: "댓글이 수정되었습니다.",
          position: "top",
        });
      })
      .catch(() => {
        toast({});
      })
      .finally(() => {
        setIsProcessing(false);
        setIsEditing(false);
      });
  }

  return (
    <Flex>
      <Box flex={1}>
        <Textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          variant="outline"
          colorScheme={"gray"}
          onClick={() => setIsEditing(false)}
        >
          무엇일까요?
        </Button>
        <Button
          isLoading={setIsProcessing}
          variant="outline"
          colorScheme={"blue"}
          onClick={onOpen}
        >
          무엇일까요2
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>수정 확인</ModalHeader>
          <ModalBody>댓글을 저장하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button colorScheme={"red"} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme={"blue"} onClick={handleCommentSubmit}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
