import React, { useState } from "react";
import {
  Box,
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
  const [customReasons, setCustomReasons] = useState({
    "부적절한 콘텐츠": "",
    스팸: "",
    도배: "",
    비방: "",
    분탕: "",
    기타: "",
  });
  const [selectedReason, setSelectedReason] = useState("");
  const [isReasonEmpty, setIsReasonEmpty] = useState(false);

  const handleReport = () => {
    if (selectedReason === "" || customReasons[selectedReason].trim() === "") {
      setIsReasonEmpty(true);
      toast({
        title: "신고 사유 입력",
        description: "신고 사유를 입력해주세요.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    axios
      .post("/api/board/report", {
        boardId,
        memberId,
        reason: customReasons[selectedReason],
        reportType: selectedReason,
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

  const handleReasonChange = (reason, value) => {
    setCustomReasons({
      ...customReasons,
      [reason]: value,
    });
    if (value.trim() !== "") {
      setIsReasonEmpty(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>신고 사유 선택</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {Object.keys(customReasons).map((reason) => (
              <Box key={reason} width="100%">
                <Button width="100%" onClick={() => setSelectedReason(reason)}>
                  {reason}
                </Button>
                {selectedReason === reason && (
                  <Input
                    mt={2}
                    placeholder={`${reason}에 대한 상세 사유를 입력해주세요.`}
                    value={customReasons[reason]}
                    onChange={(e) => handleReasonChange(reason, e.target.value)}
                    isInvalid={
                      isReasonEmpty && customReasons[reason].trim() === ""
                    }
                  />
                )}
              </Box>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleReport}>
            제출
          </Button>
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportModal;
