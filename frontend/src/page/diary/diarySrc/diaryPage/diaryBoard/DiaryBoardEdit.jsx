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
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

// import { LoginContext } from "../../diaryComponent/LoginProvider.jsx";

export function DiaryBoardEdit() {
  const { id } = useParams();
  const [diary, setDiary] = useState(null);
  const [removeFileList, setRemoveFileList] = useState([]);
  const [addFileList, setAddFileList] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const account = useContext(LoginContext);

  useEffect(() => {
    axios.get(`/api/diaryBoard/${id}`).then((res) => setDiary(res.data));
  }, []);

  function handleClickSave() {
    axios
      .putForm("/api/diaryBoard/edit", {
        id: diary.id,
        title: diary.title,
        content: diary.content,
        removeFileList,
        addFileList,
      })
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

  const fileNameList = [];
  for (let addFile of addFileList) {
    let duplicate = false;
    for (let file of diary.fileList) {
      if (file.name === addFile.name) {
        duplicate = true;
        break;
      }
    }
    fileNameList.push(
      <Flex>
        <Text fontSize={"md"} mr={3}>
          {addFile.name}
        </Text>
        <Box>{duplicate && <Badge colorScheme="red">override</Badge>}</Box>
      </Flex>,
    );
  }

  function handleRemoveSwitchChange(name, checked) {
    if (checked) {
      setRemoveFileList([...removeFileList, name]);
    } else {
      setRemoveFileList(removeFileList.filter((item) => item !== name));
    }
  }

  return (
    <Box>
      <Box>다이어리 수정</Box>
      <Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input
              defaultValue={diary.title}
              onChange={(e) => setDiary({ ...diary, title: e.target.value })}
            />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>내용</FormLabel>
            <Textarea
              defaultValue={diary.content}
              onChange={(e) => setDiary({ ...diary, content: e.target.value })}
            ></Textarea>
          </FormControl>
        </Box>
        <Box mb={7}>
          {diary.fileList &&
            diary.fileList.map((file) => (
              <Card m={3} key={file.name}>
                <CardFooter>
                  <Flex gap={3}>
                    <Box>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Box>
                    <Box>
                      <Switch
                        colorScheme={"red"}
                        onChange={(e) =>
                          handleRemoveSwitchChange(file.name, e.target.checked)
                        }
                      />
                    </Box>
                    <Box>
                      <Text>{file.name}</Text>
                    </Box>
                  </Flex>
                </CardFooter>
                <CardBody>
                  <Image
                    sx={
                      removeFileList.includes(file.name)
                        ? { filter: "blur(8px)" }
                        : {}
                    }
                    src={file.src}
                  />
                </CardBody>
              </Card>
            ))}
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>파일</FormLabel>
            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => setAddFileList(e.target.files)}
            />
          </FormControl>
        </Box>
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
        <Box mb={7}>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input
              defaultValue={diary.writer}
              onChange={(e) => setDiary({ ...diary, writer: e.target.value })}
            />
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
