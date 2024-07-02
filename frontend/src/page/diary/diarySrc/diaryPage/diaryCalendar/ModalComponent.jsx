import React, { useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const ModalComponent = ({ isOpen, onClose, onSave, onDelete, defaultText }) => {
  const [inputText, setInputText] = React.useState(defaultText || "");

  useEffect(() => {
    setInputText(defaultText || "");
  }, [defaultText]);

  const handleSave = () => {
    onSave(inputText);
    setInputText("");
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>메모 {defaultText ? "수정" : "추가"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="메모를 입력하세요."
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            {defaultText ? "수정" : "추가"}
          </Button>
          {defaultText && (
            <Button colorScheme="red" onClick={handleDelete}>
              삭제
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
