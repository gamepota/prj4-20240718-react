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
  Spinner,
  Switch,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [removeFileList, setRemoveFileList] = useState([]);
  const [addFileList, setAddFileList] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => {
      setBoard(res.data);
    });
  }, []);
  function handleClickSave() {
    axios
      .putForm(`/api/board/edit`, {
        board,
        removeFileList,
        addFileList,
      })
      .then(() => {
        toast({
          status: "success",
          description: `${board.id}번 게시글이 수정되었습니다`,
          position: "top",
        });
        navigate(`/board/${id}`);
      });
  }

  //useEffect가 실행될때까지 스피너 돌아감..
  if (board === null) {
    return <Spinner />;
  }

  const fileNameList = [];
  for (let addFile of addFileList) {
    let duplicate = false;
    for (let file of board.fileList) {
      if (file.name === addFile.name) {
        duplicate = true;
        break;
      }
    }
    fileNameList.push(
      <li>
        {addFile.name}
        {duplicate && <Badge colorScheme="red">override</Badge>}
      </li>,
    );
  }

  function handleRemoveSwitchChange(name, checked) {
    if (checked) {
      setRemoveFileList([...setRemoveFileList, name]);
    } else {
      setRemoveFileList(removeFileList.filter((item) => item !== name));
    }
    return undefined;
  }

  return (
    <Box>
      <Box>{id}번 게시물 수정</Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input
            defaultValue={board.title}
            onChange={(e) => setBoard({ ...board, title: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea
            defaultValue={board.content}
            onChange={(e) => setBoard({ ...board, content: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box>
        {board.fileList &&
          board.fileList.map((file) => (
            <Box border={"2px solid black"} m={3} key={file.name}>
              <Flex>
                <FontAwesomeIcon icon={faTrashCan} />
                <Switch
                  onChange={(e) =>
                    handleRemoveSwitchChange(file.name, e.target.checked)
                  }
                />
                <Text>{file.name}</Text>
              </Flex>
              <Box>
                <Image
                  sx={
                    removeFileList.includes(file.name)
                      ? { filter: "blur(8px)" }
                      : {}
                  }
                  src={file.src}
                />
              </Box>
            </Box>
          ))}
      </Box>
      <Box>
        <FormControl>
          <FormLabel>파일</FormLabel>
          <Input
            multiple
            type="file"
            accept="image/*"
            onChange={(e) => setAddFileList(e.target.files)}
          />
          <FormHelperText>
            총 용량은 10MB, 한 파일은 1MB를 초과할 수 없습니다.
          </FormHelperText>
        </FormControl>
      </Box>
      <Box>
        <ul>{fileNameList}</ul>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input
            defaultValue={board.writer}
            onChange={(e) => setBoard({ ...board, writer: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box>
        <Button colorScheme={"blue"} onClick={handleClickSave}>
          수정
        </Button>
      </Box>
    </Box>
  );
}
