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
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faPenToSquare,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { DiaryCommentEdit } from "./DiaryCommentEdit.jsx";

export function DiaryCommentItem({ comment, isProcessing, setIsProcessing }) {
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  function handleRemoveClick() {
    setIsProcessing(true);
    axios
      .delete(`/api/diaryComment/diaryDelete`, {
        data: { id: comment.id },
      })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        onClose();
        setIsProcessing(false);
        toast({
          status: "info",
          description: "댓글이 삭제되었습니다.",
          position: "top",
        });
      });
  }

  return (
    <Box>
      <Flex mb={7}>
        <Flex fontWeight={900}>
          <Box mr={3}>
            <FontAwesomeIcon icon={faUser} />
          </Box>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Text>{comment.nickName}</Text>
        </Flex>
        <Spacer />
        <Flex gap={2}>
          <Box>
            <FontAwesomeIcon icon={faCalendarDays} />
          </Box>
          <Box>{comment.inserted}</Box>
        </Flex>
      </Flex>
      {isEditing || (
        <Flex>
          <Box whiteSpace="pre">{comment.comment}</Box>
          <Spacer />
          {/*{account.hasAccess(diaryComment.memberId) && (*/}
          <Stack>
            <Box>
              <Button
                variant={"outline"}
                size={"sm"}
                colorScheme={"purple"}
                onClick={() => setIsEditing(true)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            </Box>
            <Box>
              <Button
                variant={"outline"}
                size={"sm"}
                isLoading={isProcessing}
                colorScheme="red"
                onClick={onOpen}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </Box>
          </Stack>
          {/*)}*/}
        </Flex>
      )}
      {isEditing && (
        <DiaryCommentEdit
          comment={comment}
          setIsEditing={setIsEditing}
          setIsProcessing={setIsProcessing}
          isProcessing={isProcessing}
        />
      )}
      {/*{account.hasAccess(comment.memberId) && (*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalBody>댓글을 삭제 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button mr={2} onClick={onClose}>
              취소
            </Button>
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
      {/*)}*/}
    </Box>
  );
}
