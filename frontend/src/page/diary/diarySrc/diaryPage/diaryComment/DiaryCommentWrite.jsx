import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { generateDiaryId } from "../../../../../util/util.jsx";

export function DiaryCommentWrite({ onCommentAdded }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { memberInfo } = useContext(LoginContext);
  const nickname = memberInfo.nickname;
  const diaryId = generateDiaryId(memberInfo.id);
  const handleDiaryCommentSubmitClick = () => {
    setLoading(true);
    axios
      .post("/api/diaryComment/add", {
        diaryId,
        nickname,
        memberId: memberInfo.id,
        comment,
      })
      .then((res) => {
        toast({
          status: "success",
          position: "top",
          description: "방명록이 등록되었습니다.",
        });
        onCommentAdded(res.data); // 새로운 댓글을 추가
        setComment(""); //
      })
      .catch((e) => {
        toast({
          status: "error",
          position: "top",
          description: "방명록 등록 중 오류가 발생했습니다.",
        });
      })
      .finally(() => setLoading(false));
  };
  let disableSaveButton = comment.trim().length === 0;
  return (
    <Box>
      <Box mb={5}>방명록 작성</Box>
      <Box borderWidth="1px" borderRadius="lg" p={4}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input value={nickname} readOnly />
          </FormControl>
          <Flex align="center">
            <FormControl flex="1">
              <FormLabel>내용</FormLabel>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                height="40px" // 여기서 높이를 설정합니다.
              />
            </FormControl>
            <Button
              isLoading={loading}
              isDisabled={disableSaveButton}
              colorScheme={"blue"}
              onClick={handleDiaryCommentSubmitClick}
              ml={2}
              height="40px"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}
