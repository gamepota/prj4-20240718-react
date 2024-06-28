import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import { generateDiaryId } from "../../../../../util/util.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";

export function DiaryCommentList({ diaryCommentList }) {
  const { memberInfo } = useContext(LoginContext);
  const navigate = useNavigate();
  const { id } = useParams();

  function handleWriteClick() {
    const diaryId = generateDiaryId(memberInfo.id);
    navigate(`/diary/${diaryId}/comment/write/${id}`);
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
    <Box>
      <Box mb={5}></Box>

      <Box>
        {diaryCommentList.length === 0 && <Center>방명록이 없습니다.</Center>}
        {diaryCommentList.length > 0 && (
          <VStack spacing={4} align="stretch">
            {diaryCommentList.map((diaryComment) => (
              <Box
                key={diaryComment.id}
                p={4}
                borderWidth="25px"
                borderRadius="lg"
                // onClick={handleViewClick(diaryComment.id)}
              >
                <HStack>
                  <Image
                    src={diaryComment.photoUrl}
                    boxSize="50px"
                    borderRadius="full"
                  />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold">{memberInfo.nickname}</Text>
                    <Text>{diaryComment.comment}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {diaryComment.inserted}
                    </Text>
                    <Button onClick={handleFriendsHome}>
                      <FontAwesomeIcon icon={faHouseChimney} />
                    </Button>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
}
