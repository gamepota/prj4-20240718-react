import {Box, Button, Card, CardBody, Center, HStack, Text, Textarea, VStack,} from "@chakra-ui/react";
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {LoginContext} from "../../../../../component/LoginProvider.jsx";
import {generateDiaryId} from "../../../../../util/util.jsx";

export function DiaryCommentList({ diaryCommentList }) {
  const { memberInfo } = useContext(LoginContext);
  const navigate = useNavigate();

  function handleViewClick(commentId) {
    const diaryId = generateDiaryId(memberInfo.id);
    return () => navigate(`/diary/${diaryId}/comment/view/${commentId}`);
  }

  return (
    <Box p={5}>
      <Center mb={5}>
        <Text fontWeight="bold" fontSize="x-large" > 방명록 보기 </Text>
      </Center>
      {diaryCommentList.length === 0 ? (
        <Center>방명록이 없습니다.</Center>
      ) : (
        <VStack spacing={4}>
          {diaryCommentList.map((diaryComment, index) => (
            <Card key={diaryComment.id} w="100%" variant="outline" boxShadow="md">
              <CardBody>
                <HStack justifyContent="space-between" mb={2}>
                  <HStack>
                  <Text fontWeight="bold">No.{index + 1}</Text>
                  <Text fontWeight="bold">{diaryComment.nickname}</Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.500">
                    {diaryComment.inserted}
                  </Text>
                </HStack>
                <Textarea
                  value={diaryComment.comment}
                  minH="100px"
                  isReadOnly
                  mb={2}
                />
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={handleViewClick(diaryComment.id)}
                >
                  자세히 보기
                </Button>
              </CardBody>
            </Card>
          ))}
        </VStack>
      )}
    </Box>
  );
}
