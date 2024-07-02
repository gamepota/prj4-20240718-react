import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import { generateDiaryId } from "../../../../../util/util.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

export function DiaryCommentList({ diaryCommentList }) {
  const { memberInfo } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleFriendsHome = (ownerId) => {
    const diaryId = generateDiaryId(ownerId);
    navigate(`/diary/${diaryId}`);
  };

  return (
    <Box m={4}>
      <Box mb={20}></Box>
      {diaryCommentList.length === 0 ? (
        <Center>방명록이 없습니다.</Center>
      ) : (
        <VStack spacing={3} align="stretch">
          {diaryCommentList.map((diaryComment) => (
            <Box
              key={diaryComment.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              _hover={{ boxShadow: "lg" }}
            >
              <HStack spacing={3}>
                <Image
                  src={diaryComment.photoUrl}
                  boxSize="100px"
                  alt={`${diaryComment.nickname}의 프로필 사진`}
                  borderRadius="full"
                />
                <Flex direction="column" w="100%">
                  <HStack justify="space-between" spacing={2}>
                    <Text fontWeight="bold">{diaryComment.nickname}</Text>
                    <Button
                      onClick={() => handleFriendsHome(diaryComment.writerId)}
                      p={0}
                      m={0}
                      bg="transparent"
                      _hover={{ bg: "transparent" }}
                    >
                      <FontAwesomeIcon icon={faHouseChimney} />
                    </Button>
                    <Text fontSize="sm" color="gray.500">
                      {format(new Date(diaryComment.inserted), "yyyy.MM.dd")}
                    </Text>
                  </HStack>
                  <Box mt={2}>
                    <Textarea
                      value={diaryComment.comment}
                      readOnly
                      size="sm"
                      resize="none"
                      p={1}
                      bg="gray.50"
                    />
                  </Box>
                </Flex>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
