import {
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
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageAmount, setPageAmount] = useState(50);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/api/board/list", {
        params: {
          pageAmount: pageAmount,
        },
      })
      .then((res) => {
        console.log("API 응답데이터", res.data);
        // const validData = res.data.filter((board) => board.board_id != null);
        setBoardList(res.data);
        console.log(res.data);
      });
  }, [pageAmount]);

  function handlePageSizeChange(number) {
    setPageAmount(number);
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
                  <td>{board.title}</td>
                  <td>{board.writer}</td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>
    </>
  );
}
