import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Text,
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
      let totalSize = files.reduce((acc, file) => acc + file.size, 0);
      let hasOversizedFile = false;

      acceptedFiles.forEach((file) => {
        if (file.size > 10 * 1024 * 1024) {
          hasOversizedFile = true;
        }
        totalSize += file.size;
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
    noClick: true,
    accept: "image/*",
  });

  function handleSaveClick() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("writer", writer);
    files.forEach((file) => {
      formData.append("files", file);
    });

    axios
      .post("/api/board/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
    <Box key={index} mt={2}>
      <Image src={URL.createObjectURL(file)} alt={file.name} boxSize="100px" />
      <Text>{file.name}</Text>
    </Box>
  ));

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
            <Box
              {...getRootProps()}
              onDrop={handleContentDrop}
              border={`2px dashed ${borderColor}`}
              padding="20px"
              textAlign="center"
              cursor="pointer"
              backgroundColor={isDragActive ? activeBgColor : "transparent"}
              borderRadius="md"
            >
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                height="150px"
              />
            </Box>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>파일</FormLabel>
            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
            />
            <FormHelperText>
              총 용량은 10MB, 한 파일은 1MB를 초과할 수 없습니다.
            </FormHelperText>
          </FormControl>
        </Box>
        <Box>{fileNameList}</Box>
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
