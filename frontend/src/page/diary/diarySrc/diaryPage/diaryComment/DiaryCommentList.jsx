import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { format, isValid, parseISO } from "date-fns";
import { generateDiaryId } from "../../../../../util/util.jsx";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";

export function DiaryCommentList({ diaryCommentList }) {
  const navigate = useNavigate();
  const toast = useToast();
  const { memberInfo } = useContext(LoginContext);

  function handleViewClick(diaryCommentId) {
    const diaryId = generateDiaryId(memberInfo.id);
    return () => navigate(`/diary/${diaryId}/comment/view/${diaryCommentId}`);
  }

  return (
    <Box p={5}>
      <Center mb={5}>
        <Text fontWeight="bold" fontSize="x-large">
          방명록 보기
        </Text>
      </Center>
      {diaryCommentList.length === 0 ? (
        <Center>방명록이 없습니다.</Center>
      ) : (
        <VStack spacing={4}>
          {diaryCommentList.map((diaryComment, index) => {
            const insertedDate = diaryComment.inserted
              ? parseISO(diaryComment.inserted)
              : null;
            const formattedDate =
              insertedDate && isValid(insertedDate)
                ? format(insertedDate, "yyyy.MM.dd")
                : "Unknown date";

            return (
              <Card
                key={`${diaryComment.id}-${index}`}
                w="100%"
                variant="outline"
                boxShadow="md"
              >
                <CardBody>
                  <HStack justifyContent="space-between" mb={2}>
                    <HStack>
                      <Text fontWeight="bold">No.{diaryComment.id}</Text>
                      <Text fontWeight="bold">{diaryComment.nickname}</Text>
                      <Button
                        colorScheme="teal"
                        size="sm"
                        onClick={handleViewClick(diaryComment.id)}
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </Button>
                    </HStack>
                    <Text fontSize="sm" color="gray.500">
                      <span style={{ color: "red" }} />
                      {formattedDate}
                    </Text>
                  </HStack>
                  <Textarea
                    value={diaryComment.comment}
                    minH="100px"
                    isReadOnly
                    mb={2}
                  />
                </CardBody>
              </Card>
            );
          })}
        </VStack>
      )}
    </Box>
  );
}
