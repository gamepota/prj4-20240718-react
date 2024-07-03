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
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LoginProvider.jsx";
import { StarRating } from "./StarRating.jsx";

export function CommentEdit({
  comment,
  setIsEditing,
  setIsProcessing,
  isProcessing,
}) {
  const [commentText, setCommentText] = useState(comment.comment);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const toast = useToast();
  const [ratingIndex, setRatingIndex] = useState(1);
  const { memberInfo } = useContext(LoginContext);
  const isLoggedIn = Boolean(memberInfo && memberInfo.access);

  function handleCommentSubmit() {
    setIsProcessing(true);
    axios
      .put("/api/hospitalComment/edit", {
        id: comment.id,
        comment: commentText,
        rate: ratingIndex,
      })
      .then(() => {
        toast({
          description: "댓글이 수정되었습니다.",
          position: "top",
          status: "success",
        });
        setIsEditing(false);
      })
      .catch(() => {
        toast({
          description: "댓글 수정에 실패했습니다.",
          status: "error",
          position: "top",
        });
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Flex>
      <Box flex={1} mr={3}>
        <Textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <StarRating ratingIndex={ratingIndex} setRatingIndex={setRatingIndex} />
      </Box>
      <Stack>
        <Button
          size={"sm"}
          variant="outline"
          colorScheme={"gray"}
          onClick={() => setIsEditing(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
        {/* 로그인 상태일 때만 수정 확인 버튼을 표시 */}
        {isLoggedIn && (
          <Button
            size={"sm"}
            isLoading={isProcessing}
            onClick={onOpen}
            variant="outline"
            colorScheme={"blue"}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        )}
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>수정 확인</ModalHeader>
          <ModalBody>댓글을 저장하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button mr={2} colorScheme={"gray"} onClick={onClose}>
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
