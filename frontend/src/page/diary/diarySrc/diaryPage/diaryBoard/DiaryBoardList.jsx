import {
  Box,
  Button,
  Center,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export function DiaryBoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pageInfo, setPageInfo] = useState({});
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    axios.get(`/api/diaryBoard/${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
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
  return (
    <Box>
      <Center>
        <Box w={1000} p={6} boxShadow="lg" borderRadius="md" bg="white">
          <Box mb={7} textAlign={"center"}>
            사진첩
          </Box>
          <Box>
            <Button onClick={() => navigate(`/diary/write`)}>업로드</Button>
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
                    onClick={() => navigate(`/diary/view/${diary.id}`)}
                    key={diary.id}
                  >
                    <Td>{diary.id}</Td>
                    <Td>{diary.title}</Td>
                    <Td>{diary.writer}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}
