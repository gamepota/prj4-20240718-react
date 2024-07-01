import React, {useContext, useEffect, useState} from "react";
import {
  Badge,
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
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {LoginContext} from "../../component/LoginProvider.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImages} from "@fortawesome/free-solid-svg-icons";

export function DiaryHomeMain() {
  const {memberInfo} = useContext(LoginContext);
  const [diaryBoardList, setDiaryBoardList] = useState([]);
  const [diaryCommentList, setDiaryCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diaryBoardRes = await axios.get(`/api/diaryBoard/list?limit=5`);
        const diaryCommentRes = await axios.get(`/api/diaryComment/list?limit=5`);
        setDiaryBoardList(diaryBoardRes.data.diaryBoardList || []);
        setDiaryCommentList(diaryCommentRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBoardClick = (id) => {
    const diaryId = memberInfo.id;
    navigate(`/diary/${diaryId}/view/${id}`);
  };

  const handleCommentClick = (id) => {
    const diaryId = memberInfo.id;
    navigate(`/diary/${diaryId}/comment/view/${id}`);
  };

  if (isLoading) {
    return (
      <Center mt={10}>
        <Spinner size="xl"/>
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
        <Heading size="lg" mb={5}>최근 게시물</Heading>
        <SimpleGrid columns={{base: 1, md: 2}} spacing={10}>
          <Box>
            <Heading size="md" mb={3}>다이어리 게시물</Heading>
            {diaryBoardList.length === 0 ? (
              <Text>조회 결과가 없습니다.</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>No.</Th>
                    <Th>제목</Th>
                    <Th>작성일</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {diaryBoardList.slice(0, 5).map((diaryBoard) => (
                    <Tr key={diaryBoard.id} onClick={() => handleBoardClick(diaryBoard.id)} _hover={{bg: hoverBg}}
                        cursor="pointer">
                      <Td>{diaryBoard.id}</Td>
                      <Td>{diaryBoard.title}</Td>
                      <Td>{diaryBoard.inserted}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>
          <Box>
            <Heading size="md" mb={3}>방명록</Heading>
            {diaryCommentList.length === 0 ? (
              <Text>방명록이 없습니다.</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>No.</Th>
                    <Th>닉네임</Th>
                    <Th>내용</Th>
                    <Th>작성일</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {diaryCommentList.slice(0, 5).map((diaryComment, index) => (
                    <Tr key={diaryComment.id} onClick={() => handleCommentClick(diaryComment.id)} _hover={{bg: hoverBg}}
                        cursor="pointer">
                      <Td>{index + 1}</Td>
                      <Td>{diaryComment.nickname}</Td>
                      <Td>{diaryComment.comment.substring(0, 20)}...</Td>
                      <Td>{diaryComment.inserted}</Td>
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
