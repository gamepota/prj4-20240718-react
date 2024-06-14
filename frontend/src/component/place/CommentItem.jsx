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
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import { CommentEdit } from "./CommentEdit.jsx";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);

  function handleRemoveClick() {
    setIsProcessing(true);
    axios
      .delete("/api/hospitalComments/remove", {
        data: { id: comment.id },
      })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        onClose();
        setIsProcessing(false);
        toast({
          description: "댓글이 삭제되었습니다.",
          status: "info",
          position: "top",
        });
      });
  }

  return (
    <Box border={"1px solid black"} my={3}>
      <Flex>
        <Box>{comment.nickname}</Box>
        <Spacer />
        <Box>{comment.inserted}</Box>
      </Flex>

      <Flex>
        <Box>{comment.comment}</Box>
        <Spacer />
        <Box>
          <Button colorScheme={"purple"} onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Box>
        {isEditing && (
          <CommentEdit
            comment={comment}
            setIsEditing={setIsEditing}
            setIsProcessing={setIsProcessing}
            isProcessing={isProcessing}
          />
        )}
        <Box>
          <Button isLoading={isProcessing} colorScheme="red" onClick={onOpen}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>삭제 확인</ModalHeader>
              <ModalBody>댓글을 삭제 하시겠습니까?</ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>취소</Button>
                <Button
                  isLoading={isProcessing}
                  colorScheme={"red"}
                  onClick={handleRemoveClick}
                >
                  삭제
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
    </Box>
  );
}
