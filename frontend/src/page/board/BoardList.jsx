import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageAmount, setPageAmount] = useState(30);
  const [pageInfo, setPageInfo] = useState({});
  const [boardType, setBoardType] = useState("전체");
  // const [offsetReset, setOffsetReset] = useState(false);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

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
  console.log("searchParam=", searchParams.toString());
  console.log("pageInfo=", pageInfo);

  function handlePageSizeChange(number) {
    setPageAmount(number);
    // setOffsetReset(true);
    searchParams.set("pageAmount", number);
    searchParams.set("offsetReset", true);
    console.log("searchParams=" + searchParams.toString());
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
                <Th>게시판 종류</Th>
                <Th>게시글ID</Th>
                <Th w={500} textAlign={"center"}>
                  제목
                </Th>
                <Th>작성자</Th>
                <Th>조회수</Th>
              </Tr>
            </Thead>
            <Tbody>
              {boardList.map((board) => (
                <Tr
                  _hover={{
                    bgColor: "gray.200",
                  }}
                  cursor={"pointer"}
                  onClick={() => navigate(`/board/${board.id}`)}
                  key={board.id}
                >
                  <td>{board.boardType}</td>
                  <td>{board.id}</td>
                  <td>
                    {board.title}
                    {board.numberOfImages && (
                      <Badge>
                        <FontAwesomeIcon icon={faImage} />
                        {board.numbefOfImages}
                      </Badge>
                    )}
                  </td>
                  <td>{board.writer}</td>
                  <td style={{ textAlign: "center" }}>{board.views}</td>
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
    </>
  );
}
