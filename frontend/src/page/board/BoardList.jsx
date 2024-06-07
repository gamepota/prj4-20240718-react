import { Box, Heading, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    axios.get("/api/board/list").then((res) => {
      setBoardList(res.data);
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
              <Tr key={board.id}>
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
