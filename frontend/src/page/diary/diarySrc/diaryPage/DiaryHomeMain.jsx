import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../../../component/LoginProvider.jsx";
import { format } from "date-fns";
import { generateDiaryId } from "../../../../util/util.jsx";
import { DiaryContext } from "../diaryComponent/DiaryContext.jsx";

export function DiaryHomeMain() {
  const { memberInfo } = useContext(LoginContext);
  const { diaryBoardList, setDiaryBoardList } = useContext(DiaryContext); // DiaryContext 사용
  const [diaryCommentList, setDiaryCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diaryBoardRes = await axios.get(`/api/diaryBoard/list?memberId=${memberInfo.id}&limit=5`);
        const diaryCommentRes = await axios.get(`/api/diaryComment/list?memberId=${memberInfo.id}&limit=5`);
        setDiaryBoardList(diaryBoardRes.data.diaryBoardList || []);
        setDiaryCommentList(diaryCommentRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [memberInfo.id, setDiaryBoardList]);

  const handleBoardClick = (id) => {
    navigate(`/diary/${generateDiaryId(memberInfo.id)}/view/${id}`);
  };

  const handleCommentClick = () => {
    navigate(`/diary/${generateDiaryId(memberInfo.id)}/comment/list`);
  };

  if (isLoading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      <Box mb={5}>
        <Image
          src="https://via.placeholder.com/1200x300"
          alt="Diary Banner"
          width="100%"
          borderRadius="md"
          boxShadow="md"
        />
      </Box>

      <Box mb={10}>
        <Heading size="lg" mb={5}>
          최근 게시물
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box>
            <Heading size="md" mb={3}>
              일기장
            </Heading>
            {diaryBoardList.length === 0 ? (
              <Text>조회 결과가 없습니다.</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th w="10%">No.</Th>
                    <Th>제목</Th>
                    <Th>내용</Th>
                    <Th w="20%">작성일</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {diaryBoardList.slice(0, 5).map((diaryBoard, index) => (
                    <Tr
                      key={diaryBoard.id}
                      onClick={() => handleBoardClick(diaryBoard.id)}
                      _hover={{ bg: hoverBg }}
                      cursor="pointer"
                    >
                      <Td fontSize="sm">{diaryBoardList.length - index}</Td>
                      <Td fontSize="sm" maxW="100px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{diaryBoard.title}</Td>
                      <Td fontSize="sm" maxW="100px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{diaryBoard.content}</Td>
                      <Td fontSize="sm">
                        {format(new Date(diaryBoard.inserted), "yyyy.MM.dd")}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>
          <Box>
            <Heading size="md" mb={3}>
              방명록
            </Heading>
            {diaryCommentList.length === 0 ? (
              <Text>방명록이 없습니다.</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th w="10%">No.</Th>
                    <Th>닉네임</Th>
                    <Th>내용</Th>
                    <Th w="20%">작성일</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {diaryCommentList.slice(0, 5).map((diaryComment, index) => (
                    <Tr
                      key={diaryComment.id}
                      onClick={() => handleCommentClick()}
                      _hover={{ bg: hoverBg }}
                      cursor="pointer"
                    >
                      <Td fontSize="sm">{index + 1}</Td>
                      <Td fontSize="sm" maxW="100px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                        {diaryComment.nickname}
                      </Td>
                      <Td fontSize="sm" maxW="200px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                        {diaryComment.comment.substring(0, 20)}
                      </Td>
                      <Td fontSize="sm">
                        {format(new Date(diaryComment.inserted), "yyyy.MM.dd")}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
