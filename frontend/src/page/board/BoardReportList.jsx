import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
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
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../component/Pagination.jsx";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function BoardReportList() {
  const [boardList, setBoardList] = useState([]);
  const [pageAmount, setPageAmount] = useState(30);
  const [pageInfo, setPageInfo] = useState({});
  const [boardType, setBoardType] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("전체");
  const [searchParams] = useSearchParams();
  const [selectedBoards, setSelectedBoards] = useState([]);
  const toast = useToast();
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const memberId = memberInfo && memberInfo.id ? parseInt(memberInfo.id) : null;
  const params = memberId ? { memberId } : {};

  const navigate = useNavigate();

  useEffect(() => {
    const boardTypeParam = searchParams.get("boardType") || "전체";
    setBoardType(boardTypeParam);
    axios
      .get(`/api/board/report/list?${searchParams}`)
      .then((res) => {
        setBoardList(res.data.boardList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setSearchType("전체");
    setSearchKeyword("");

    const searchTypeParam = searchParams.get("searchType");
    const keywordParam = searchParams.get("keyword");
    if (searchTypeParam) {
      setSearchType(searchTypeParam);
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
      .finally(() => navigate(`/board/${boardId}`));
  }

  function handleSearchClick() {
    searchParams.set("searchType", searchType);
    searchParams.set("keyword", searchKeyword);
    searchParams.set("offsetReset", true);

    navigate(`?${searchParams}`);
  }

  function toggleCheckbox(boardId) {
    if (selectedBoards.includes(boardId)) {
      setSelectedBoards(selectedBoards.filter((id) => id !== boardId));
    } else {
      setSelectedBoards([...selectedBoards, boardId]);
    }
  }

  function handleDeleteSelected() {
    if (selectedBoards.length === 0) {
      return;
    }

    axios
      .delete("/api/board/delete", {
        data: {
          ids: selectedBoards,
          memberId: params.memberId,
        },
      })
      .then((res) => {
        toast({
          status: "success",
          description: "삭제가 완료되었습니다",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setSelectedBoards([]);
        axios
          .get(`/api/board/report/list`)
          .then((res) => {
            setBoardList(res.data.boardList);
            setPageInfo(res.data.pageInfo);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        toast({
          status: "error",
          description: "삭제 중 오류가 발생했습니다",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }

  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      <Container maxW="container.xl" py={10}>
        <Box>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                  bg="purple.100"
                  color="black"
                  fontWeight="medium"
                  _hover={{ bg: "purple.200" }}
                  _active={{ bg: "purple.300" }}
                  size="lg"
                  width="200px"
                  mt={4}
                >
                  {`${boardType} 게시판`}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handleClickBoardTypeButton("전체")}>
                    전체 게시판
                  </MenuItem>
                  <MenuItem onClick={() => handleClickBoardTypeButton("자유")}>
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
                    onClick={() => handleClickBoardTypeButton("반려동물 건강")}
                  >
                    반려동물 건강 게시판
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleClickBoardTypeButton("훈련/교육")}
                  >
                    훈련/교육 게시판
                  </MenuItem>
                  <MenuItem onClick={() => handleClickBoardTypeButton("리뷰")}>
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
        <Center mt={10} mb={10}>
          <Flex p={4} borderRadius="md" alignItems="center">
            <Heading as="h1" size="lg" ml={2}>
              신고 게시물 관리
            </Heading>
          </Flex>
        </Center>
        <Center>
          <Box mb={10} w="100%" px={5}>
            <Table
              variant="simple"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Thead bg={useColorModeValue("gray.100", "gray.700")}>
                <Tr>
                  <Th>
                    <input
                      type="checkbox"
                      checked={
                        selectedBoards.length > 0 &&
                        selectedBoards.length === boardList.length
                      }
                      onChange={() => {
                        if (
                          selectedBoards.length > 0 &&
                          selectedBoards.length === boardList.length
                        ) {
                          setSelectedBoards([]);
                        } else {
                          setSelectedBoards(boardList.map((board) => board.id));
                        }
                      }}
                    />
                  </Th>
                  <Th>누적된 신고 수</Th>
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
                  <Tr key={board.id} _hover={{ bg: hoverBg }}>
                    <Td>
                      <input
                        type="checkbox"
                        checked={selectedBoards.includes(board.id)}
                        onChange={() => toggleCheckbox(board.id)}
                      />
                    </Td>
                    <Td
                      textAlign="center"
                      onClick={() =>
                        navigate("content", {
                          state: {
                            boardId: board.id,
                            repoterMemberId: board.repoterId,
                          },
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <span>{board.numberOfReports}</span>
                    </Td>
                    <Td textAlign="center">
                      <span
                        onClick={() =>
                          handleClickBoardTypeButton(board.boardType)
                        }
                        style={{ cursor: "pointer" }}
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
                    <Td>{board.writer}</Td>
                    <Td textAlign="center">{board.numberOfLikes}</Td>
                    <Td textAlign="center">{board.views}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Flex align="center" justify="right" mb={4}>
              <Button
                colorScheme="red"
                onClick={handleDeleteSelected}
                disabled={selectedBoards.length === 0}
              >
                선택 삭제
              </Button>
            </Flex>
          </Box>
        </Center>

        <Pagination
          pageInfo={pageInfo}
          pageNumbers={pageNumbers}
          handlePageButtonClick={handlePageButtonClick}
        />
        <Center mb={10}>
          <Flex gap={1} alignItems="center">
            <Box>
              <Select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                bg={bg}
              >
                <option value="전체">전체</option>
                <option value="글">글</option>
                <option value="작성자">작성자</option>
              </Select>
            </Box>
            <Box>
              <Input
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="검색어"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearchClick();
                  }
                }}
              />
            </Box>
            <Box>
              <Button onClick={handleSearchClick}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </Box>
          </Flex>
        </Center>
        <Center mt={10}>
          <Flex flexDirection={"column"} alignItems={"center"} gap={6} mb={10}>
            <Box>
              <Menu textAlign={"center"} fontSize={"lg"}>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      as={Button}
                      rightIcon={
                        isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />
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
      </Container>
    </>
  );
}
