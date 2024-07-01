// DeleteConfirmationModal.jsx
import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const DeleteConfirmationModal = ({ isOpen, onClose, onClickRemove }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>삭제하시겠습니까?</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>취소</Button>
          <Button colorScheme="red" onClick={onClickRemove}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
