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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faImages,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import { generateDiaryId } from "../../../../../util/util.jsx";
import { format } from "date-fns";

export function DiaryBoardList() {
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const [diaryBoardList, setDiaryBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateFnsDate = new Date();

  useEffect(() => {
    axios.get(`/api/diaryBoard/list?${searchParams}`).then((res) => {
      setDiaryBoardList(res.data.diaryBoardList);
      setPageInfo(res.data.pageInfo);
    });

    setSearchType("all");
    setSearchKeyword("");

    const typeParam = searchParams.get("type");
    const keywordParam = searchParams.get("keyword");
    if (typeParam) {
      setSearchType(typeParam);
    }
    if (keywordParam) {
      setSearchKeyword(keywordParam);
    }
  }, [searchParams]);

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handleSearchClick() {
    navigate(`/?type=${searchType}$keyword=${searchKeyword}`);
  }

  function handlePageButtonClick(pageNumber) {
    searchParams.set("page", pageNumber);
    navigate(`/?${searchParams}`);
  }

  function handleSelectedDiaryBoard(id) {
    const diaryId = generateDiaryId(memberInfo.id);
    return () => navigate(`/diary/${diaryId}/view/${id}`);
  }
  function handleWriteClick(id) {
    const diaryId = generateDiaryId(memberInfo.id);
    navigate(`/diary/${diaryId}/write/${id}`);
  }

  return (
    <Box>
      <Box mb={5}></Box>
      <Center>
        <Heading>일기장</Heading>
      </Center>
      <Box>
        {memberInfo && <Button onClick={handleWriteClick}>글쓰기</Button>}
      </Box>
      <Box>
        {diaryBoardList.length === 0 && <Center>조회 결과가 없습니다.</Center>}
        {diaryBoardList.length > 0 && (
          <Table>
            <Thead>
              <Tr>
                <Th>N번째 일기</Th>
                <Th>내용</Th>
                <Th>who?</Th>
                <Th>where</Th>
              </Tr>
            </Thead>
            <Tbody>
              {diaryBoardList.map((diaryBoard) => (
                <Tr
                  _hover={{
                    bgColor: "gray.200",
                  }}
                  cursor={"pointer"}
                  onClick={handleSelectedDiaryBoard(diaryBoard.id)}
                  key={diaryBoard.id}
                >
                  //ㄹㅇㅌ ㅋㅁㅌ ㄹㅅㅌ
                  <Td>{diaryBoard.id}</Td>
                  <Td>
                    {diaryBoard.title}
                    {diaryBoard.numberOfImages > 0 && (
                      <Badge ml={2}>
                        <Flex gap={1}>
                          <Box>
                            <FontAwesomeIcon icon={faImages} />
                          </Box>
                          <Box>{diaryBoard.numberOfImages}</Box>
                        </Flex>
                      </Badge>
                    )}
                  </Td>
                  <Td>{diaryBoard.writer}</Td>
                  <Td>
                    <span style={{ color: "red" }} />
                    {format(dateFnsDate, "yyyy-MM-dd")}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
      <Center mb={10}>
        <Flex gap={1}>
          <Box>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
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
            />
          </Box>
          <Box>
            <Button onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Box>
        </Flex>
      </Center>
      <Center>
        <Flex gap={1}>
          {pageInfo.prevPageNumber && (
            <>
              <Button onClick={() => handlePageButtonClick(1)}>
                <FontAwesomeIcon icon={faAnglesLeft} />
              </Button>
              <Button
                onClick={() => handlePageButtonClick(pageInfo.prevPageNumber)}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </Button>
            </>
          )}
          {pageNumbers.map((pageNumber) => (
            <Button
              onClick={() => handlePageButtonClick(pageNumber)}
              key={pageNumber}
              colorScheme={
                pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
              }
            >
              {pageNumbers}
            </Button>
          ))}
          {pageInfo.nextPageNumber && (
            <>
              <Button
                onClick={() => handlePageButtonClick(pageInfo.nextPageNumber)}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
              <Button
                onClick={() => handlePageButtonClick(pageInfo.lastPageNumber)}
              >
                <FontAwesomeIcon icon={faAnglesRight} />
              </Button>
            </>
          )}
        </Flex>
      </Center>
    </Box>
  );
}
