import React from "react";
import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa";

const DeleteConfirmationModal = ({ isOpen, onClose, onClickRemove }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="white"
        color="gray.800"
        boxShadow="xl"
        borderRadius="lg"
        maxW="400px"
      >
        <ModalHeader textAlign="center">
          <VStack spacing={4}>
            <Icon as={FaExclamationTriangle} w={10} h={10} color="red.500" />
            <Text fontSize="2xl" fontWeight="bold">
              삭제 확인
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <Text fontSize="lg">정말 삭제하시겠습니까?</Text>
          <Text fontSize="sm" color="gray.500" mt={2}>
            이 작업은 되돌릴 수 없습니다.
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button onClick={onClose} mr={3}>
            취소
          </Button>
          <Button colorScheme="red" onClick={onClickRemove}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
