import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function BoardWrite() {
  const { memberInfo } = useContext(LoginContext);
  const [title, setTitle] = useState("");
  const [boardType, setBoardType] = useState("카테고리 선택");
  const [content, setContent] = useState("");
  const [fileNameList, setFileNameList] = useState([]);
  const [invisibledText, setInvisibledText] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const toast = useToast();

  const handleSaveClick = () => {
    // Save logic here
    toast({
      title: "저장 완료",
      description: "게시글이 성공적으로 저장되었습니다.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleChange = (e) => {
    // Handle file input change
  };

  return (
    <Center>
      <Box
        maxW={"700px"}
        w={"100%"}
        p={6}
        boxShadow={"lg"}
        borderRadius={"md"}
        mt={10}
        bg={"white"}
      >
        <Box mb={6}>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Text>{memberInfo.nickname}</Text>
          </FormControl>
        </Box>
        <Box mb={6}>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="filled"
              focusBorderColor="teal.500"
              placeholder="제목을 입력하세요"
            />
          </FormControl>
        </Box>
        <Box mb={6}>
          <Box fontWeight="bold" mb={2}>
            카테고리 선택
          </Box>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  bg="gray.100"
                  color="black"
                  fontWeight="medium"
                  _hover={{ bg: "gray.200" }}
                  _active={{ bg: "gray.300" }}
                  size="lg"
                  width="100%"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="md"
                >
                  {`${boardType}`}
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
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
        <Box mb={6}>
          <FormControl>
            <FormLabel>내용</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              height="200px"
              variant="filled"
              focusBorderColor="teal.500"
              placeholder="내용을 입력하세요"
            />
          </FormControl>
        </Box>
        <Box mb={6}>
          <FormControl>
            <FormLabel>파일</FormLabel>
            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={handleChange}
              variant="filled"
              focusBorderColor="teal.500"
            />
            {!invisibledText && (
              <FormHelperText color="red.500">
                총 용량은 100MB, 한 파일은 10MB를 초과할 수 없습니다.
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box mb={6}>
          <ul>{fileNameList}</ul>
        </Box>
        <Box textAlign="center">
          <Button
            colorScheme={"teal"}
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
