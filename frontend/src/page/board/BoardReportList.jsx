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
  const [selectedBoards, setSelectedBoards] = useState([]); // 선택된 게시글 ID 관리
  const toast = useToast();
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const memberId = memberInfo && memberInfo.id ? parseInt(memberInfo.id) : null;
  const params = memberId ? { memberId } : {};

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardTypeParam = searchParams.get("boardType") || "전체";
        setBoardType(boardTypeParam);

        const response = await axios.get(
          `/api/board/report/list?${searchParams}`,
        );
        setBoardList(response.data.boardList);
        setPageInfo(response.data.pageInfo);

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

        navigate("/board/list/report");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchParams, navigate]); // navigate를 의존성 배열에 추가하여 useEffect가 navigate 후에 실행되도록 함

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

  // 체크박스를 토글하는 함수
  function toggleCheckbox(boardId) {
    if (selectedBoards.includes(boardId)) {
      setSelectedBoards(selectedBoards.filter((id) => id !== boardId));
    } else {
      setSelectedBoards([...selectedBoards, boardId]);
    }
  }

  // 선택된 게시글 삭제 요청 보내기
  function handleDeleteSelected() {
    if (selectedBoards.length === 0) {
      return; // 선택된 게시글이 없으면 무시
    }

    axios
      .delete("/api/board/delete", {
        data: {
          ids: selectedBoards,
          memberId: params.memberId,
        },
      })
      .then((res) => {
        // 삭제 성공 시에는 성공 메시지 표시
        toast({
          status: "success",
          description: "삭제가 완료되었습니다",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setSelectedBoards([]);
        navigate("/board/list/report");
      })
      .catch((error) => {
        // 삭제 실패 시에는 에러 메시지 표시
        toast({
          status: "error",
          description: "삭제 중 오류가 발생했습니다",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
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
          <Flex align="center" justify="center" mb={4}>
            <Button
              colorScheme="red"
              onClick={handleDeleteSelected}
              disabled={selectedBoards.length === 0}
            >
              선택 삭제
            </Button>
          </Flex>
          <Table boxShadow="lg" borderRadius="10">
            <Thead>
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
                <Tr key={board.id}>
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
                    } // 절대 경로 사용
                    style={{ cursor: "pointer" }} // 커서 스타일 추가
                  >
                    <span>{board.numberOfReports}</span>
                  </Td>
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
                  <Td>{board.writer}</Td>
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
        <Flex gap={1}>
          <Box>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
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
    </>
  );
}
