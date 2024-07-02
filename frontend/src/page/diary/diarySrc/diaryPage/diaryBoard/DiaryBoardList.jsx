import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import Pagination from "../../../../../component/Pagination.jsx";
import { generateDiaryId } from "../../../../../util/util.jsx";

export function DiaryBoardList() {
  const { memberInfo } = useContext(LoginContext);
  const [diaryBoardList, setDiaryBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Search Params:", searchParams.toString());

    axios
      .get(`/api/diaryBoard/list?${searchParams.toString()}`)
      .then((res) => {
        console.log("API Response:", res.data);
        setDiaryBoardList(res.data.diaryBoardList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    const typeParam = searchParams.get("type");
    const keywordParam = searchParams.get("keyword");
    if (typeParam) {
      setSearchType(typeParam);
    }
    if (keywordParam) {
      setSearchKeyword(keywordParam);
    }
  }, [searchParams.toString()]);

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handleSearchClick() {
    const params = new URLSearchParams({
      type: searchType,
      keyword: searchKeyword,
    });
    setSearchParams(params);
    navigate(`/?${params.toString()}`);
  }

  function handlePageButtonClick(pageNumber) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber);
    setSearchParams(params);
    navigate(`/?${params.toString()}`);
  }

  function handleSelectedDiaryBoard(diaryBoardId) {
    const diaryId = generateDiaryId(memberInfo.id);
    return () => navigate(`/diary/${diaryId}/view/${diaryBoardId}`);
  }

  function handleWriteClick(diaryBoardId) {
    const diaryId = generateDiaryId(memberInfo.id);
    navigate(`/diary/${diaryId}/write/${diaryBoardId}`);
  }

  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      <Center mb={10}>
        <Heading>다이어리 목록</Heading>
      </Center>

      <Center mb={5}>
        <Box w="full" maxW="1200px">
          {memberInfo.access && (
            <Button onClick={handleWriteClick} mb={5} colorScheme="teal">
              글쓰기
            </Button>
          )}
          <Table boxShadow="lg" borderRadius="md" bg={bg}>
            <Thead bg={useColorModeValue("gray.200", "gray.700")}>
              <Tr>
                <Th textAlign="center">N번째 일기</Th>
                <Th textAlign="center">제목</Th>
                <Th textAlign="center">작성자</Th>
              </Tr>
            </Thead>
            <Tbody>
              {diaryBoardList.length === 0 && (
                <Tr>
                  <Td colSpan="3" textAlign="center">
                    조회 결과가 없습니다.
                  </Td>
                </Tr>
              )}
              {diaryBoardList.map((diaryBoard) => (
                <Tr
                  key={diaryBoard.id}
                  _hover={{ bg: hoverBg }}
                  cursor="pointer"
                  onClick={handleSelectedDiaryBoard(diaryBoard.id)}
                >
                  <Td textAlign="center">{diaryBoard.id}</Td>
                  <Td textAlign="center">
                    {diaryBoard.title}
                    {diaryBoard.numberOfImages > 0 && (
                      <Badge ml={2} colorScheme="teal">
                        <FontAwesomeIcon icon={faImages} />
                        {diaryBoard.numberOfImages}
                      </Badge>
                    )}
                  </Td>
                  <Td textAlign="center">{diaryBoard.writer}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>

      <Pagination
        pageInfo={pageInfo}
        pageNumbers={pageNumbers}
        handlePageButtonClick={handlePageButtonClick}
      />

      <Center mb={10}>
        <Flex gap={2}>
          <Box>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              boxShadow="md"
              _hover={{ boxShadow: "lg" }}
            >
              <option value="all">전체</option>
              <option value="text">글</option>
              <option value="nickname">작성자</option>
            </Select>
          </Box>
          <Box>
            <Input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="검색어"
              boxShadow="md"
              _hover={{ boxShadow: "lg" }}
            />
          </Box>
          <Box>
            <Button
              onClick={handleSearchClick}
              colorScheme="teal"
              boxShadow="md"
              _hover={{ boxShadow: "lg" }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Box>
        </Flex>
      </Center>
    </>
  );
}
