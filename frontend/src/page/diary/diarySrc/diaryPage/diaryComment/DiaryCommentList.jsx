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
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import { generateDiaryId } from "../../../../../util/util.jsx";

export function DiaryCommentList({ diaryCommentList }) {
  const { memberInfo } = useContext(LoginContext);
  const navigate = useNavigate();

  function handleWriteClick() {
    const diaryId = generateDiaryId(memberInfo.id);
    navigate(`/diary/${diaryId}/comment/write/${id}`);
  }

  function handleViewClick(commentId) {
    const diaryId = generateDiaryId(memberInfo.id);
    return () => navigate(`/diary/${diaryId}/comment/view/${commentId}`);
  }

  return (
    <Box>
      <Box mb={5}></Box>
      <Center>
        <Heading>방명록 목록</Heading>
      </Center>
      {memberInfo && (
        <Box mb={5}>
          <Button onClick={handleWriteClick}>작성</Button>
        </Box>
      )}
      <Box>
        {diaryCommentList.length === 0 && <Center>방명록이 없습니다.</Center>}
        {diaryCommentList.length > 0 && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>방명록</Th>
                <Th>작성자</Th>
              </Tr>
            </Thead>
            <Tbody>
              {diaryCommentList.map((diaryComment, index) => (
                <Tr
                  onClick={handleViewClick(diaryComment.id)}
                  key={diaryComment.id}
                >
                  <Td>{index + 1}</Td>
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
