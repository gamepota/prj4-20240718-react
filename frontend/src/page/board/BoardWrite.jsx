import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [files, setFiles] = useState([]);
  const [invisibledText, setInvisibledText] = useState(true);
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles) => {
      files.reduce((acc, file) => acc + file.size, 0);
      let hasOversizedFile = false;

      acceptedFiles.forEach((file) => {
        if (file.size > 10 * 1024 * 1024) {
          hasOversizedFile = true;
        }
      });
      if (totalSize > 10 * 1024 * 1024 || hasOversizedFile) {
        setDisableSaveButton(true);
        setInvisibledText(false);
      } else {
        setDisableSaveButton(false);
        setInvisibledText(true);
        setFiles([...files, ...acceptedFiles]);
      }
    },
    [files],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  function handleSaveClick() {
    axios
      .postForm("/api/board/add", {
        title,
        content,
        writer,
        files,
      })
      .then(() => {
        navigate("/board/list");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    if (title.trim().length === 0 || content.trim().length === 0) {
      setDisableSaveButton(true);
    } else {
      setDisableSaveButton(false);
    }
  }, [title, content]);

  const fileNameList = files.map((file, index) => (
    <li key={index}>{file.name}</li>
  ));

  function handleChange(e) {
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
      setFiles(selectedFiles);
    }
  }

  function handleContentDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    const filesDropped = Array.from(event.dataTransfer.files);
    onDrop(filesDropped);
  }

  const borderColor = useColorModeValue("gray.300", "gray.600");
  const activeBgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Center>
      <Box
        maxW={"500px"}
        w={"100%"}
        p={4}
        boxShadow={"md"}
        borderRadius={"md"}
        mt={10}
      >
        <Box>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>내용</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></Textarea>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>파일</FormLabel>
            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={handleChange}
            ></Input>
            {!invisibledText && (
              <FormHelperText color="red.500">
                총 용량은 100MB, 한 파일은 10MB를 초과할 수 없습니다.
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box>
          <ul>{fileNameList}</ul>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            ></Input>
          </FormControl>
        </Box>
        <Box>
          <Button
            colorScheme={"blue"}
            onClick={handleSaveClick}
            isDisabled={disableSaveButton}
          >
            저장
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
