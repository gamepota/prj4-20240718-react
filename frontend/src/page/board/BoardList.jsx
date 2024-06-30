import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../../component/LoginProvider.jsx";
import Pagination from "../../component/Pagination.jsx";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageAmount, setPageAmount] = useState(30);
  const [pageInfo, setPageInfo] = useState({});
  const [boardType, setBoardType] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const boardTypeParam = searchParams.get("boardType") || "전체";
    setBoardType(boardTypeParam);
    axios
      .get(`/api/board/list?${searchParams}`)
      .then((res) => {
        setBoardList(res.data.boardList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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

  function handlePageSizeChange(number) {
    setPageAmount(number);
    searchParams.set("pageAmount", number);
    searchParams.set("offsetReset", true);
    navigate(`?${searchParams}`);
  }

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handlePageButtonClick(pageNumber) {
    searchParams.set("page", pageNumber);
    searchParams.set("offsetReset", false);
    navigate(`?${searchParams}`);
  }

  function handleClickBoardTypeButton(boardType) {
    searchParams.set("offsetReset", true);
    setBoardType(boardType);
    searchParams.set("boardType", boardType);
    navigate(`?${searchParams}`);
  }

  function handleBoardClick(boardId) {
    axios
      .get(`/api/board/${boardId}`)
      .then(() => {})
      .finally(navigate(`/board/${boardId}`));
  }

  function handleSearchClick() {
    searchParams.set("type", searchType);
    searchParams.set("keyword", searchKeyword);

    navigate(`?${searchParams}`);
  }

  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      <Center mt={10} mb={10}>
        <Box w="full" maxW="1200px">
          <Table boxShadow="lg" borderRadius="md" bg={bg}>
            <Thead bg={useColorModeValue("gray.200", "gray.700")}>
              <Tr>
                <Th textAlign="center">게시판 종류</Th>
                <Th textAlign="center">게시글ID</Th>
                <Th textAlign="center" w={500}>
                  제목
                </Th>
                <Th textAlign="center">작성자</Th>
                <Th textAlign="center">추천수</Th>
                <Th textAlign="center">조회수</Th>
              </Tr>
            </Thead>
            <Tbody>
              {boardList.map((board) => (
                <Tr key={board.id} _hover={{ bg: hoverBg }}>
                  <Td textAlign="center" cursor="pointer" onClick={() => handleClickBoardTypeButton(board.boardType)}>
                    {board.boardType}
                  </Td>
                  <Td textAlign="center">{board.id}</Td>
                  <Td
                    textAlign="center"
                    cursor="pointer"
                    onClick={() => handleBoardClick(board.id)}
                  >
                    {board.title}
                    {board.numberOfImages > 0 && (
                      <Badge ml={2} colorScheme="teal">
                        {board.numberOfImages}
                        <FontAwesomeIcon icon={faImage} />
                      </Badge>
                    )}
                    {board.numberOfComments > 0 && (
                      <span> [{board.numberOfComments}]</span>
                    )}
                  </Td>
                  <Td textAlign="center">{board.writer}</Td>
                  <Td textAlign="center">{board.numberOfLikes}</Td>
                  <Td textAlign="center">{board.views}</Td>
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
              <option value="nickName">작성자</option>
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

      <Center mb={10}>
        <Box>
          <Menu textAlign={"center"} fontSize={"lg"}>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  colorScheme="teal"
                  size="md"
                  boxShadow="md"
                  _hover={{ boxShadow: "lg" }}
                >
                  {`게시글 (${pageAmount})개씩 보기`}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handlePageSizeChange(10)}>
                    10개씩 보기
                  </MenuItem>
                  <MenuItem onClick={() => handlePageSizeChange(30)}>
                    30개씩 보기
                  </MenuItem>
                  <MenuItem onClick={() => handlePageSizeChange(50)}>
                    50개씩 보기
                  </MenuItem>
                  <MenuItem onClick={() => handlePageSizeChange(100)}>
                    100개씩 보기
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
      </Center>
    </>
  );
}
