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

  return (
    <>
      <Center>
        <Flex maxW={"500"}>
          <Box m={"auto"} fontSize={"xl"}>
            종합 게시판
          </Box>
          <Box m={"50"}>
            <Menu textAlign={"center"} fontSize={"xl"}>
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
                    size={"sm"}
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
