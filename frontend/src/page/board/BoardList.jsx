import React, { useContext, useEffect, useState } from "react";
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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { generateDiaryId } from "../../util/util.jsx";
import axios from "axios";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageAmount, setPageAmount] = useState(30);
  const [pageInfo, setPageInfo] = useState({});
  const [boardType, setBoardType] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [searchParams] = useSearchParams();
  const { memberInfo } = useContext(LoginContext);

  const navigate = useNavigate();

  const [selectedWriter, setSelectedWriter] = useState(null);
  const [selectedWriterId, setSelectedWriterId] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/board/list?${searchParams}`)
      .then((res) => {
        setBoardList(res.data.boardList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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

  function handleSearchClick() {}

  function handleWriterClick(writer, writerId) {
    setSelectedWriter(writer);
    setSelectedWriterId(writerId);
  }

  function handleDiaryView() {
    const diaryId = generateDiaryId(selectedWriterId);
    navigate(`/diary/${diaryId}`);
  }

  return (
    <>
      <Center>
        <Flex
          maxW={"500px"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={6}
        >
          <Box>
            <Menu textAlign={"center"} m={"auto"} fontSize={"2xl"}>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={Button}
                    rightIcon={
                      isOpen ? (
                        <span>
                          <ChevronDownIcon />
                        </span>
                      ) : (
                        <span>
                          <ChevronUpIcon />
                        </span>
                      )
                    }
                    bg={"gray.700"}
                    color={"white"}
                    fontWeight={"bold"}
                    _hover={{ bg: "gray.800" }}
                    size={"lg"}
                    p={6}
                  >
                    {`${boardType} 게시판`}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => handleClickBoardTypeButton("전체")}
                    >
                      전체 게시판
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClickBoardTypeButton("자유")}
                    >
                      자유 게시판
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClickBoardTypeButton("사진 공유")}
                    >
                      사진 공유 게시판
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClickBoardTypeButton("질문/답변")}
                    >
                      질문/답변 게시판
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleClickBoardTypeButton("반려동물 건강")
                      }
                    >
                      반려동물 건강 게시판
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClickBoardTypeButton("훈련/교육")}
                    >
                      훈련/교육 게시판
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClickBoardTypeButton("리뷰")}
                    >
                      리뷰게시판
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClickBoardTypeButton("이벤트/모임")}
                    >
                      이벤트/모임 게시판
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </Box>

          <Box>
            <Menu textAlign={"center"} fontSize={"lg"}>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={Button}
                    rightIcon={
                      isOpen ? (
                        <span>
                          <ChevronDownIcon />
                        </span>
                      ) : (
                        <span>
                          <ChevronUpIcon />
                        </span>
                      )
                    }
                    colorScheme={"blue"}
                    size={"md"}
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
        </Flex>
      </Center>

      <Center>
        <Box mb={10}></Box>
        <Box mb={10}>
          <Table boxShadow="lg" borderRadius="10">
            <Thead>
              <Tr>
                <Th textAlign={"center"}>게시판 종류</Th>
                <Th>게시글ID</Th>
                <Th w={500} textAlign="center">
                  제목
                </Th>
                <Th>작성자</Th>
                <Th>추천수</Th>
                <Th>조회수</Th>
              </Tr>
            </Thead>
            <Tbody>
              {boardList.map((board) => (
                <Tr key={board.id}>
                  <Td textAlign="center">
                    <span
                      onClick={() =>
                        handleClickBoardTypeButton(board.boardType)
                      }
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {board.boardType}
                    </span>
                  </Td>
                  <Td textAlign="center">{board.id}</Td>
                  <Td
                    onClick={() => handleBoardClick(board.id)}
                    cursor="pointer"
                    _hover={{
                      bgColor: "gray.200",
                    }}
                  >
                    {board.title}
                    {board.numberOfImages > 0 && (
                      <Badge ml={2}>
                        {board.numberOfImages}
                        <FontAwesomeIcon icon={faImage} />
                      </Badge>
                    )}
                    {board.numberOfComments > 0 && (
                      <span> [{board.numberOfComments}]</span>
                    )}
                  </Td>
                  <Td>
                    <Popover>
                      <PopoverTrigger>
                        <span
                          onClick={() =>
                            handleWriterClick(board.writer, board.memberId)
                          }
                          style={{
                            cursor: "pointer",
                            color: "blue",
                            textDecoration: "underline",
                          }}
                        >
                          {board.writer}
                        </span>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>작성자</PopoverHeader>
                        <PopoverBody>
                          <Button colorScheme="blue" onClick={handleDiaryView}>
                            작성자 다이어리 보기
                          </Button>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>
                  <Td textAlign="center">{board.numberOfLikes}</Td>
                  <Td textAlign="center">{board.views}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>
      <Center>
        <Flex>
          {pageInfo.prevPageNumber && (
            <>
              <Button onClick={() => handlePageButtonClick(1)}>맨앞</Button>
              <Button
                onClick={() => handlePageButtonClick(pageInfo.prevPageNumber)}
              >
                이전
              </Button>
            </>
          )}
          {pageNumbers.map((pageNumber) => (
            <Button
              w={"10"}
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
                onClick={() => handlePageButtonClick(pageInfo.nextPageNumber)}
              >
                다음
              </Button>
              <Button
                onClick={() => handlePageButtonClick(pageInfo.lastPageNumber)}
              >
                맨뒤
              </Button>
            </>
          )}
        </Flex>
      </Center>
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
    </>
  );
}
//
