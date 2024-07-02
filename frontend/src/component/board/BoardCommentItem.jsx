import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BoardCommentEdit } from "./BoardCommentEdit.jsx";
import { LoginContext } from "../LoginProvider.jsx";

export function BoardCommentItem({ comment, isProcessing, setIsProcessing }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { memberInfo } = useContext(LoginContext);
  const memberId = memberInfo && memberInfo.id ? parseInt(memberInfo.id) : null;
  useEffect(() => {
    async function fetchProfileImage() {
      try {
        const res = await axios.get(`/api/member/${comment.memberId}`);
        setProfileImage(res.data.imageUrl);
        console.log("Fetched profileImage=", res.data.imageUrl);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    }

    fetchProfileImage();
  }, []); // comment.memberId를 의존성 배열에 추가

  const handleRemoveClick = () => {
    setIsProcessing(true);
    axios
      .delete("/api/comment/remove", {
        data: { id: comment.id },
      })
      .then(() => {
        toast({
          description: "댓글이 삭제되었습니다.",
          status: "info",
          position: "top",
        });
        onClose();
      })
      .catch((err) => {
        toast({
          description: "댓글 삭제에 실패했습니다.",
          status: "error",
          position: "top",
        });
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" mb={4} bg="white">
      <Flex align="center" mb={3}>
        {profileImage ? (
          <Image src={profileImage} boxSize="40px" borderRadius="full" mr={2} />
        ) : (
          <Avatar name={comment.writer} size="sm" mr={2} />
        )}
        <Box>
          <Text fontWeight="bold">{comment.writer}</Text>
          <Text fontSize="sm" color="gray.500">
            {new Date(comment.inserted).toLocaleString()}
          </Text>
        </Box>
        <Spacer />
        {memberId === comment.memberId && (
          <Flex>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              mr={2}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={onOpen}
              isLoading={isProcessing}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </Flex>
        )}
      </Flex>
      {!isEditing ? (
        <Text>{comment.boardComment}</Text>
      ) : (
        <BoardCommentEdit
          comment={comment}
          setIsEditing={setIsEditing}
          setIsProcessing={setIsProcessing}
          isProcessing={isProcessing}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalBody>댓글을 삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button mr={2} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="red" onClick={handleRemoveClick}>
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
