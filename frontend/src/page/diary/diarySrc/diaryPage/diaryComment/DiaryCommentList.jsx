import {
  Box,
  Button,
  Center,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import { generateDiaryId } from "../../../../../util/util.jsx";

export function DiaryCommentList() {
  const [diaryCommentList, setDiaryCommentList] = useState([]);
  const { id } = useParams();
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/diaryComment/list`, { params: { diaryId: id } })
      .then((res) => {
        setDiaryCommentList(res.data);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
      });
  }, [id]);
  function handleWriteClick() {
    const diaryId = generateDiaryId(memberInfo.id);
    navigate(`/diary/${diaryId}/comment/write`);
  }
  function handleViewClick(id) {
    const diaryId = generateDiaryId(memberInfo.id);
    return () => navigate(`/diary/${diaryId}/comment/view/${id}`);
  }
  return (
    <Box>
      <Box mb={5}></Box>
      <Center>
        <Heading>방명록 목록</Heading>
      </Center>
      <Box mb={5}>
        <Button onClick={handleWriteClick}>작성</Button>
      </Box>

      <Box>
        {diaryCommentList.length === 0 && <Center>방명록이 없습니다.</Center>}
        {diaryCommentList.length > 0 && (
          <Table>
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>방명록</Th>
                <Th>작성자</Th>
              </Tr>
            </Thead>
            <Tbody>
              {diaryCommentList.map((diaryComment) => (
                <Tr onClick={handleViewClick} key={diaryComment.id}>
                  <Td>{diaryComment.id}</Td>
                  <Td>{diaryComment.comment}</Td>
                  <Td>{memberInfo.nickname}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
}
