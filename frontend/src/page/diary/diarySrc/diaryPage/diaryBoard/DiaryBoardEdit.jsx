import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  StackDivider,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {LoginContext} from "../../../../../component/LoginProvider.jsx";
import {generateDiaryId} from "../../../../../util/util.jsx";

export function DiaryBoardEdit() {
  const { id } = useParams();
  const [diaryBoard, setDiaryBoard] = useState(null);
  const [removeFileList, setRemoveFileList] = useState([]);
  const [addFileList, setAddFileList] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { memberInfo } = useContext(LoginContext);
  const access = memberInfo?.access;
  const nickname = memberInfo?.nickname;
  const isLoggedIn = Boolean(access);
  const diaryId = generateDiaryId(memberInfo.id);

  useEffect(() => {
    axios.get(`/api/diaryBoard/${id}`).then((res) => setDiaryBoard(res.data));
  }, [id]);

  function handleClickSave() {
    axios
      .putForm(`/api/diaryBoard/edit`, {
        id: diaryBoard.id,
        title: diaryBoard.title,
        content: diaryBoard.content,
        nickname: memberInfo.nickname,
        removeFileList,
        addFileList,
        memberId: memberInfo.id,
      })
      .then(() => {
        toast({
          status: "success",
          description: `${diaryBoard.id}번 게시물이 수정되었습니다.`,
          position: "top",
        });
        navigate(`/diary/${diaryId}/view/${diaryBoard.id}`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description: "게시물이 수정되지 않았습니다. 작성한 내용을 확인해주세요.",
            position: "top",
          });
        }
      })
      .finally(() => {
        onClose();
      });
  }

  if (diaryBoard === null) {
    return <Spinner />;
  }

  const fileNameList = Array.from(addFileList).map((addFile) => {
    const duplicate = diaryBoard.fileList.some((file) => file.name === addFile.name);
    return (
      <Flex key={addFile.name} justify="space-between" align="center">
        <Text fontSize="md" mr={3}>
          {addFile.name}
        </Text>
        {duplicate && <Badge colorScheme="red">override</Badge>}
      </Flex>
    );
  });

  function handleRemoveSwitchChange(name, checked) {
    setRemoveFileList((prevList) =>
      checked ? [...prevList, name] : prevList.filter((item) => item !== name)
    );
  }

  return (
    <Box maxW="800px" mx="auto" mt={10} p={5} boxShadow="md" borderRadius="md" bg="white">
      <Text fontSize="x-large" mb={10}>{diaryBoard.id}번 일기 수정</Text>
      <Box>
        <FormControl mb={7}>
          <FormLabel>제목</FormLabel>
          <Input
            defaultValue={diaryBoard.title}
            onChange={(e) => setDiaryBoard({ ...diaryBoard, title: e.target.value })}
          />
        </FormControl>
        <FormControl mb={7}>
          <FormLabel>내용</FormLabel>
          <Textarea
            defaultValue={diaryBoard.content}
            onChange={(e) => setDiaryBoard({ ...diaryBoard, content: e.target.value })}
          />
        </FormControl>
        <FormControl mb={7}>
          <FormLabel>파일</FormLabel>
          <Input
            multiple
            type="file"
            accept="image/*"
            onChange={(e) => setAddFileList(e.target.files)}
          />
        </FormControl>
        {diaryBoard.fileList && (
          <Box mb={7}>
            {diaryBoard.fileList.map((file) => (
              <Card key={file.name} m={3} boxShadow="md">
                <CardBody>
                  <Image
                    src={file.src}
                    sx={removeFileList.includes(file.name) ? { filter: "blur(8px)" } : {}}
                  />
                </CardBody>
                <CardFooter>
                  <Flex align="center" justify="space-between">
                    <Flex align="center" gap={3}>
                      <FontAwesomeIcon color="black" icon={faTrashCan} />
                      <Switch
                        colorScheme="red"
                        onChange={(e) => handleRemoveSwitchChange(file.name, e.target.checked)}
                      />
                      <Text>{file.name}</Text>
                    </Flex>
                  </Flex>
                </CardFooter>
              </Card>
            ))}
          </Box>
        )}
        {fileNameList.length > 0 && (
          <Box mb={7}>
            <Card>
              <CardHeader>
                <Heading size="md">선택된 파일 목록</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing={4}>
                  {fileNameList}
                </Stack>
              </CardBody>
            </Card>
          </Box>
        )}
        <FormControl mb={7}>
          <FormLabel>작성자</FormLabel>
          <Input defaultValue={diaryBoard.writer} readOnly />
        </FormControl>
        <Button onClick={onOpen} colorScheme="blue">
          저장
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>저장 확인</ModalHeader>
          <ModalBody>저장하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={handleClickSave} colorScheme="blue">
              확인
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
