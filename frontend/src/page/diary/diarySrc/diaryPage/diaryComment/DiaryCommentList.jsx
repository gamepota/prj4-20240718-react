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
  const dateFnsDate = new Date();

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
                    // borderRadius="full"
                    alt={diaryComment.nickname+"의 프로필 사진"}
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
                      <Textarea
                        value={diaryComment.comment}
                        readOnly
                        size="sm"
                        resize="none"
                        p={1}
                      />
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