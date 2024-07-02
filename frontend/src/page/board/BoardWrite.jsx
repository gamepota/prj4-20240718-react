import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Textarea,
  useToast,
  Heading,
  Text,
  Container,
  Select,
  IconButton,
  Spacer
} from "@chakra-ui/react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from "@chakra-ui/icons";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [invisibledText, setInvisibledText] = useState(true);
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const [boardType, setBoardType] = useState("자유");
  const navigate = useNavigate();
  const location = useLocation();
  const { memberInfo } = useContext(LoginContext);
  const memberId = memberInfo && memberInfo.id ? parseInt(memberInfo.id) : null;
  const params = memberId ? { memberId } : {};
  const toast = useToast();

  function handleSaveClick() {
    axios
      .postForm("/api/board/add", {
        title,
        content,
        boardType,
        memberId: memberInfo.id,
        files,
      })
      .then(() => {
        navigate("/board/list");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!memberInfo) {
      toast({
        title: "로그인 회원만 가능합니다",
        duration: 3000,
        isClosable: true,
        status: "error",
      });
      const previousPath = location.state?.from || "/";
      navigate(previousPath, { replace: true });
    }
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
      setFiles(selectedFiles);
      setInvisibledText(true);

      if (title.trim().length === 0 || content.trim().length === 0) {
        setDisableSaveButton(true);
      } else {
        setDisableSaveButton(false);
      }
    }
  }

  if (!memberInfo) {
    return <Box />;
  }
  return (
    <Container maxW="container.md" py={10}>
      <Box p={6} borderWidth="1px" borderRadius="md" bg="white">
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          게시물 작성
        </Heading>
        <FormControl mb={4}>
          <FormLabel>작성자</FormLabel>
          <Input readOnly value={memberInfo.nickname} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>제목</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>카테고리 선택</FormLabel>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  bg="teal.500"
                  color="white"
                  fontWeight="bold"
                  _hover={{ bg: "teal.600" }}
                  _active={{ bg: "teal.700" }}
                  size="lg"
                  p={4}
                  width="100%"
                >
                  {`${boardType} 게시판`}
                </MenuButton>
                <MenuList overflowY="auto">
                  <MenuItem onClick={() => setBoardType("자유")}>
                    자유 게시판
                  </MenuItem>
                  <MenuItem onClick={() => setBoardType("사진 공유")}>
                    사진 공유 게시판
                  </MenuItem>
                  <MenuItem onClick={() => setBoardType("질문/답변")}>
                    질문/답변 게시판
                  </MenuItem>
                  <MenuItem onClick={() => setBoardType("반려동물 건강")}>
                    반려동물 건강 게시판
                  </MenuItem>
                  <MenuItem onClick={() => setBoardType("훈련/교육")}>
                    훈련/교육 게시판
                  </MenuItem>
                  <MenuItem onClick={() => setBoardType("리뷰")}>
                    리뷰 게시판
                  </MenuItem>
                  <MenuItem onClick={() => setBoardType("이벤트/모임")}>
                    이벤트/모임 게시판
                  </MenuItem>
                  {params.memberId === 1 && (
                    <MenuItem onClick={() => setBoardType("반려동물 정보")}>
                      반려동물 정보 게시판
                    </MenuItem>
                  )}
                </MenuList>
              </>
            )}
          </Menu>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>내용</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>파일</FormLabel>
          <Input
            multiple
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
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
          <Button colorScheme="blue" onClick={handleSaveClick} isDisabled={disableSaveButton}>
            저장
          </Button>
        </Flex>
      </Box>
    </Container>
  );
}
