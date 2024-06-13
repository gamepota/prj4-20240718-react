import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function DiaryBoardEdit() {
  const [diary, setDiary] = useState(null);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios.get(`/api/diaryBoard/${id}`).then((res) => setDiary(res.data.diary));
  }, []);

  function handleClickSave() {
    axios
      .put("/api/diaryBoard/edit", diary)
      .then(() => {
        toast({
          status: "success",
          description: "수정이 완료되었습니다.",
          position: "top",
        });
        navigate(`/diaryBoard/${diary.id}`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description:
              "게시물이 수정되지 않았습니다. 작성한 내용을 확인해주세요.",
            position: "top",
          });
        }
      })
      .finally(() => {
        onClose();
      });
  }

  if (diary === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>사진첩 수정</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>사진</FormLabel>
            <Textarea
              defaultValue={diary.content}
              onChange={(e) => setDiary({ ...diary, content: e.target.value })}
            ></Textarea>
          </FormControl>
        </Box>
        <Box>
          <Button onClick={onOpen} colorScheme={"blue"}>
            저장
          </Button>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>저장하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={handleClickSave} colorScheme={"blue"}>
              확인
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
