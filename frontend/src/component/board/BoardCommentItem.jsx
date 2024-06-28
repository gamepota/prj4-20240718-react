import { useContext, useState } from "react";
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
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faPenToSquare,
  faTrashAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BoardCommentEdit } from "./BoardCommentEdit.jsx";
import { LoginContext } from "../LoginProvider.jsx"; //asdf

//asdf
export function BoardCommentItem({ comment, isProcessing, setIsProcessing }) {
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const memberId = memberInfo && memberInfo.id ? parseInt(memberInfo.id) : null;
  const params = memberId ? { memberId } : {};

  const handleRemoveClick = () => {
    setIsProcessing(true); // 삭제 처리 중임을 나타내는 상태 업데이트
    // 여기에 삭제 API 호출 또는 삭제 처리 로직 추가
    axios
      .delete("/api/comment/remove", {
        data: { id: comment.id },
      })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        toast({
          description: "댓글이 삭제되었습니다.",
          status: "info",
          position: "top",
        });
        onClose(); // 모달 닫기
        setIsProcessing(false);
      });
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" mb={4}>
      <Flex mb={3} align="center">
        <Box mr={3}>
          <FontAwesomeIcon icon={faUser} />
        </Box>
        <Text fontWeight="bold">{comment.writer}</Text>
        <Spacer />
        <Flex align="center">
          <Box mr={2}>
            <FontAwesomeIcon icon={faCalendarDays} />
          </Box>
          <Box fontSize="sm" color="gray.600" mr={2}>
            {new Date(comment.inserted).toLocaleString()}
          </Box>
        </Flex>
      </Flex>
      {isEditing || (
        <Flex>
          <Box whiteSpace={"pre"}>{comment.boardComment}</Box>
          <Spacer />
          {/* 삭제 및 수정 버튼 댓글작성자만 보이게... */}
          {memberId == comment.memberId && (
            <Box>
              <Button
                variant="outline"
                size="sm"
                colorScheme="purple"
                onClick={() => setIsEditing(true)}
                mr={2}
              >
                <FontAwesomeIcon icon={faPenToSquare} /> 수정
              </Button>
              <Button
                variant="outline"
                size="sm"
                isLoading={isProcessing}
                colorScheme="red"
                onClick={onOpen}
              >
                <FontAwesomeIcon icon={faTrashAlt} /> 삭제
              </Button>
            </Box>
          )}
        </Flex>
      )}
      {isEditing && (
        <BoardCommentEdit
          comment={comment}
          setIsEditing={setIsEditing}
          setIsProcessing={setIsProcessing}
          isProcessing={isProcessing}
        />
      )}

      {/* 삭제 확인 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalBody>댓글을 삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button mr={2} onClick={onClose}>
              취소
            </Button>
            <Button
              isLoading={isProcessing}
              colorScheme="red"
              onClick={handleRemoveClick}
            >
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
