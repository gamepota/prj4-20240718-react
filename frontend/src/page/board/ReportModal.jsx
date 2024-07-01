import React, { useState } from "react";
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

const ReportModal = ({ isOpen, onClose, boardId, memberId }) => {
  const toast = useToast();
  const [customReason, setCustomReason] = useState("");

  const handleReport = (reason) => {
    axios
      .post("/api/board/report", {
        boardId,
        memberId,
        reason,
      })
      .then((res) => {
        toast({
          title: "신고 완료",
          description: "신고가 성공적으로 접수되었습니다.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          toast({
            title: "이미 신고 처리한 게시물 입니다",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "오류 발생",
            description: "서버 오류로 인해 처리할 수 없습니다.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  const handleCustomReport = () => {
    if (!customReason.trim()) {
      toast({
        title: "신고 사유 입력",
        description: "신고 사유를 입력해주세요.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    handleReport(customReason);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>신고 사유 선택</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={3}>
            <Button onClick={() => handleReport("부적절한 콘텐츠")}>
              부적절한 콘텐츠
            </Button>
            <Button onClick={() => handleReport("스팸")}>스팸</Button>
            <Button onClick={() => handleReport("도배")}>도배</Button>
            <Button onClick={() => handleReport("비방")}>비방</Button>
            <Button onClick={() => handleReport("분탕")}>분탕</Button>
            <Input
              placeholder="기타 사유 입력"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
            />
            <Button colorScheme="blue" onClick={handleCustomReport}>
              제출
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportModal;
