import {
  Box,
  Button,
  Flex,
  FormControl,
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
