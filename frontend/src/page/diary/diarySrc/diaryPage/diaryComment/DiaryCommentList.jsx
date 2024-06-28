//List
// Comment
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
//테스트 완료
//Write
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import { generateDiaryId } from "../../../../../util/util.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { DiaryCommentComponent } from "./DiaryCommentComponent.jsx";
import axios from "axios";

export function DiaryCommentList({ diaryCommentList }) {
  const { memberInfo } = useContext(LoginContext);
  const navigate = useNavigate();
  const dateFnsDate = new Date();
  function handleWriteClick() {
    const diaryId = generateDiaryId(memberInfo.id);
    navigate(`/diary/${diaryId}/comment/write/${diaryId}`);
  }
  function handleViewClick(commentId) {
    const diaryId = generateDiaryId(memberInfo.id);
    return () => navigate(`/diary/${diaryId}/comment/view/${commentId}`);
  }
  function handleFriendsHome() {
    const diaryId = generateDiaryId(memberInfo.id);
    navigate(`/diary/${diaryId}`);
  }
  return (
    <Box m={4}>
      {" "}
      {/* 전체 리스트의 위아래 공간을 추가 */}
      <Box mb={20}></Box>
      <Box>
        {diaryCommentList.length === 0 && <Center>방명록이 없습니다.</Center>}
        {diaryCommentList.length > 0 && (
          <VStack spacing={3} align="stretch">
            {diaryCommentList.map((diaryComment) => (
              <Box
                key={diaryComment.id}
                p={4} // 아이템의 패딩을 추가하여 내부 공간을 확보
                borderWidth="10px"
                borderRadius="md"
                // onClick={handleViewClick(diaryComment.id)}
              >
                <HStack spacing={3}>
                  <Image
                    src={diaryComment.photoUrl}
                    boxSize="200px"
                    borderRadius="full"
                  />
                  <Flex direction="column" align="flex-end" w="100%">
                    <HStack w="100%" justify="space-between" spacing={2}>
                      <HStack spacing={1}>
                        <Text fontSize="13px">No.{diaryComment.id}</Text>
                        <Text fontWeight="bold">{memberInfo.nickname}</Text>
                        <Button
                          onClick={handleFriendsHome}
                          p={0}
                          m={0}
                          bg="transparent"
                          _hover={{ bg: "transparent" }}
                        >
                          <FontAwesomeIcon icon={faHouseChimney} />
                        </Button>
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        <span style={{ color: "red" }} />
                        {format(dateFnsDate, "yyyy.MM.dd")}
                      </Text>
                    </HStack>
                    <Box w="100%" textAlign="center" mt={2}>
                      <Textarea readOnly size="sm" resize="none" p={1}>
                        {diaryComment.comment}
                      </Textarea>
                    </Box>
                  </Flex>
                </HStack>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export function DiaryComment() {
  const { id } = useParams();
  const [diaryId, DiaryId] = useState(null);
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  // useEffect(() => {
  //   const userId = extractUserIdFromDiaryId(id);
  //   axios.get(`/api/diaryComment/${userId}`).then((res) => DiaryId(res.data));
  // }, []);
  useEffect(() => {
    const diaryId = generateDiaryId(memberInfo.id);
    axios.get(`/api/diaryComment/${diaryId}`).then((res) => DiaryId(res.data));
  }, [id]);
  if (DiaryId == null) {
    return <Spinner />;
  }
  return (
    <Box>
      <DiaryCommentComponent diaryId={diaryId} />
    </Box>
  );
}

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
