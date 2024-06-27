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

export function DiaryCommentList() {
  const [diaryCommentList, setDiaryCommentList] = useState([]);
  const { id } = useParams();
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/diaryComment/list`)
      .then((res) => {
        setDiaryCommentList(res.data);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
      })
      .finally(() => {});
  }, [id]);

  return (
    <Box>
      <Box mb={5}></Box>
      <Center>
        <Heading>방명록 목록</Heading>
      </Center>
      <Box>
        <Button
          onClick={() => navigate(`/diaryComment/write/${memberInfo.id}`)}
        >
          작성
        </Button>
      </Box>
      <Box>
        {diaryCommentList.length === 0 && <Center>방명록이 없습니다.</Center>}
        {diaryCommentList.length > 0 && (
          <Table>
            <Thead>
              <Tr>
                <Th>작성자</Th>
                <Th>방명록</Th>
              </Tr>
            </Thead>
            <Tbody>
              {diaryCommentList.map((diaryComment) => (
                <Tr
                  onClick={() =>
                    navigate(`/diaryComment/view/${diaryComment.id}`)
                  }
                  key={diaryComment.id}
                >
                  <Td>{memberInfo.nickname}</Td>
                  <Td>{diaryComment.comment}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
}
