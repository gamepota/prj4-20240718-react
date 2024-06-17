import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faComments,
  faImages,
  faMagnifyingGlass,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export function DiaryBoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pageInfo, setPageInfo] = useState({});
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    axios.get(`/api/diaryBoard/list?${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
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

  function handlePageButtonClick(pageNumber) {
    searchParams.set("page", pageNumber);
    navigate(`/?${searchParams}`);
  }

  function handleSearchClick() {
    navigate(`/?type=${searchType}$keyword=${searchKeyword}`);
  }

  return (
    <Box>
      <Center>
        <Box w={1000} p={6} boxShadow="lg" borderRadius="md" bg="white">
          <Box mb={7} textAlign={"center"}>
            게시물
          </Box>
          <Box mb={10}></Box>
          <Box>
            <Button onClick={() => navigate(`/diary/write`)}>업로드</Button>
          </Box>
          <Box mb={10}>
            {boardList.length === 0 && <Center>조회된 결과가 없습니다.</Center>}
            {boardList.length > 0 && (
              <Table>
                <Thead>
                  <Tr>
                    <Td w={20}>#</Td>
                    <Td>Title</Td>
                    <Th w={40}>
                      <FontAwesomeIcon icon={faUserPen} />
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {boardList.map((board) => (
                    <Tr
                      cursor={"pointer"}
                      _hover={{
                        bgColor: "gray.200",
                      }}
                      onClick={() => navigate(`/diary/view/${board.id}`)}
                      key={board.id}
                    >
                      <Td>{board.id}</Td>
                      <Td>
                        {board.title}
                        {board.numberOfImages > 0 && (
                          <Badge ml={2}>
                            <Flex gap={1}>
                              <Box>
                                <FontAwesomeIcon icon={faImages} />
                              </Box>
                              <Box>{board.numberOfImages}</Box>
                            </Flex>
                          </Badge>
                        )}
                        {board.numberOfComment > 0 && (
                          <Badge ml={2}>
                            <Flex gap={1}>
                              <Box>
                                <FontAwesomeIcon icon={faComments} />
                              </Box>
                              <Box>{board.numberOfComments}</Box>
                            </Flex>
                          </Badge>
                        )}
                      </Td>
                      <Td>{board.writer}</Td>
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
                  <option value="nickName">작성자</option>
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
                    onClick={() =>
                      handlePageButtonClick(pageInfo.prevPageNumber)
                    }
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
                  {pageNumber}
                </Button>
              ))}
              {pageInfo.nextPageNumber && (
                <>
                  <Button
                    onClick={() =>
                      handlePageButtonClick(pageInfo.nextPageNumber)
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                  </Button>
                  <Button
                    onClick={() =>
                      handlePageButtonClick(pageInfo.lastPageNumber)
                    }
                  >
                    <FontAwesomeIcon icon={faAnglesRight} />
                  </Button>
                </>
              )}
            </Flex>
          </Center>
        </Box>
      </Center>
    </Box>
  );
}
