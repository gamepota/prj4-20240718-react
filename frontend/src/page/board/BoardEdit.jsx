import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [removeFileList, setRemoveFileList] = useState([]);
  const [addFileList, setAddFileList] = useState([]);
  const [invisibledText, setInvisibledText] = useState(true);
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { memberInfo } = useContext(LoginContext);
  const memberId = memberInfo && memberInfo.id ? parseInt(memberInfo.id) : null;
  const params = memberId ? { memberId } : {};

  useEffect(() => {
    axios.get(`/api/board/${id}`, { params }).then((res) => {
      setBoard(res.data.board);
    });
  }, [id, params]);

  useEffect(() => {
    if (board) {
      setDisableSaveButton(
        board.title.trim().length === 0 || board.content.trim().length === 0
      );
    }
  }, [board]);

  const handleClickSave = () => {
    axios
      .putForm(`/api/board/edit`, {
        id: board.id,
        title: board.title,
        content: board.content,
        memberId: params.memberId,
        removeFileList,
        addFileList,
      })
      .then(() => {
        toast({
          status: "success",
          description: `${board.id}번 게시글이 수정되었습니다`,
          duration: 500,
          position: "top",
        });
        navigate(`/board/${id}`);
      })
      .catch((err) => {
        const errorMessage =
          err.response.status === 403 ? "권한이 없답니다" : "다른 오류가 발생했습니다";
        toast({
          status: "error",
          description: errorMessage,
          duration: 500,
          position: "top",
        });
      })
      .finally(onClose);
  };

  if (board === null) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const fileNameList = addFileList.map((file) => {
    const duplicate = board.fileList.some((boardFile) => boardFile.name === file.name);
    return (
      <li key={file.name}>
        {file.name}
        {duplicate && <Badge colorScheme="red">override</Badge>}
      </li>
    );
  });

  const handleRemoveSwitchChange = (name, checked) => {
    setRemoveFileList((prevList) =>
      checked ? [...prevList, name] : prevList.filter((item) => item !== name)
    );
  };

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    let totalSize = 0;
    let hasOversizedFile = false;

    selectedFiles.forEach((file) => {
      if (file.size > 100 * 1024 * 1024) {
        hasOversizedFile = true;
      }
      totalSize += file.size;
    });

    if (totalSize > 100 * 1024 * 1024 || hasOversizedFile) {
      setDisableSaveButton(true);
      setInvisibledText(false);
    } else {
      setDisableSaveButton(false);
      setInvisibledText(true);
      setAddFileList(selectedFiles);
    }

    if (board.title.trim().length === 0 || board.content.trim().length === 0) {
      setDisableSaveButton(true);
    } else {
      setDisableSaveButton(false);
    }
  };

  return (
    <Box maxW="800px" m="auto" p={6} boxShadow="lg" borderRadius="md" mt={10} bg="gray.50">
      <Text fontSize="2xl" fontWeight="bold" mb={6}>{id}번 게시물 수정</Text>
      <Box>
        <FormControl mb={4}>
          <FormLabel>제목</FormLabel>
          <Input
            defaultValue={board.title}
            onChange={(e) => setBoard({ ...board, title: e.target.value })}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>본문</FormLabel>
          <Textarea
            defaultValue={board.content}
            onChange={(e) => setBoard({ ...board, content: e.target.value })}
          />
        </FormControl>
        <Box mb={4}>
          {board.fileList &&
            board.fileList.map((file) => (
              <Box border="1px solid gray" borderRadius="md" p={3} mb={3} key={file.name}>
                <Flex justify="space-between" align="center">
                  <Flex align="center">
                    <FontAwesomeIcon icon={faTrashCan} style={{ marginRight: "8px" }} />
                    <Switch
                      onChange={(e) => handleRemoveSwitchChange(file.name, e.target.checked)}
                    />
                    <Text ml={3}>{file.name}</Text>
                  </Flex>
                  <Box>
                    <Image
                      boxSize="100px"
                      objectFit="cover"
                      src={file.src}
                      alt={file.name}
                      borderRadius="md"
                      style={
                        removeFileList.includes(file.name) ? { filter: "blur(8px)" } : {}
                      }
                    />
                  </Box>
                </Flex>
              </Box>
            ))}
        </Box>
        <FormControl mb={4}>
          <FormLabel>파일</FormLabel>
          <Input multiple type="file" accept="image/*" onChange={handleChange} />
          {!invisibledText && (
            <FormHelperText color="red.500">
              총 용량은 100MB, 한 파일은 100MB를 초과할 수 없습니다.
            </FormHelperText>
          )}
        </FormControl>
        <Box mb={4}>
          <ul>{fileNameList}</ul>
        </Box>
        <Flex justify="flex-end" gap={3}>
          <Button colorScheme="blue" onClick={onOpen} isDisabled={disableSaveButton}>
            수정
          </Button>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>게시물 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>정말로 수정하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleClickSave} colorScheme="blue">
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
