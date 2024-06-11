import { Box, Heading, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/board/list").then((res) => {
      console.log("API 응답데이터", res.data);
      // const validData = res.data.filter((board) => board.board_id != null);
      setBoardList(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <Box>
      <Box mb={10}>
        <Heading>게시물 목록</Heading>
      </Box>
      <Box mb={10}>
        <Table>
          <Thead>
            <Tr>
              <Th w={100}>게시글ID</Th>
              <Th>제목</Th>
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
    </Box>
  );
}
