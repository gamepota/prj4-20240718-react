import { useState } from "react";
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
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faPenToSquare,
  faTrashAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export function BoardCommentItem({
  comment,
  isProcessing,
  setIsProcessing,
  onDeleteComment,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleRemoveClick = () => {
    setIsProcessing(true); // 삭제 처리 중임을 나타내는 상태 업데이트
    // 여기에 삭제 API 호출 또는 삭제 처리 로직 추가
    onDeleteComment(comment.id); // 코멘트 삭제 함수 호출 (실제 삭제 로직은 필요에 따라 구현)
    onClose(); // 모달 닫기
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" mb={4}>
      <Flex mb={3} align="center">
        <Box mr={3}>
          <FontAwesomeIcon icon={faUser} />
        </Box>
        <Text fontWeight="bold">{comment.id}</Text>
        <Spacer />
        <Flex align="center">
          <Box mr={2}>
            <FontAwesomeIcon icon={faCalendarDays} />
          </Box>
          <Text>{comment.inserted}</Text>
        </Flex>
      </Flex>

      <Box whiteSpace="pre">{comment.boardComment}</Box>

      <Flex mt={3} align="center">
        <Spacer />
        {/* 삭제 및 수정 버튼 항상 보이게 */}
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
      </Flex>

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
