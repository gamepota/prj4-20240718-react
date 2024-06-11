import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function DiaryBoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/diaryBoard/list`).then((res) => setBoardList(res.data));
  }, []);
  return (
    <Box>
      <Box mb={7} textAlign={"center"}>
        방명록 목록
      </Box>
      <Box>
        <Button onClick={() => navigate(`/diary/write`)}>글쓰기</Button>
      </Box>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Td>#</Td>
              <Td>Title</Td>
              <Th>
                <FontAwesomeIcon icon={faUserPen} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((diary) => (
              <Tr
                cursor={"pointer"}
                _hover={{
                  bgColor: "gray.200",
                }}
                onClick={() => navigate(`/diaryBoard/${diary.id}`)}
                key={diary.id}
              >
                <Td>{diary.id}</Td>
                <Td>{diary.writer}</Td>
                <Td>{diary.inserted}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
