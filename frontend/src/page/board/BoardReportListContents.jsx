import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Divider,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export function BoardReportListContents() {
  const location = useLocation();
  const [board, setBoard] = useState([]);
  const { boardId, memberId } = location.state || {};
  useEffect(() => {
    axios
      .get(`/api/board/report/list/content`, { params: { boardId, memberId } })
      .then((res) => {
        // 응답 처리
        setBoard(res.data.board);
      })
      .catch((error) => {
        // 에러 처리
        console.error("Error fetching report content:", error);
      });
  }, []);
  const dummyReports = [
    {
      id: 1,
      reporter: "사용자1",
      reason: "부적절한 내용",
      content: "이 게시물은 커뮤니티 가이드라인을 위반합니다.",
    },
    {
      id: 2,
      reporter: "사용자2",
      reason: "스팸",
      content: "반복적인 광고성 내용이 포함되어 있습니다.",
    },
  ];

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={4} align="stretch">
        {dummyReports.map((report) => (
          <Box
            key={report.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            shadow="md"
          >
            <VStack align="stretch" spacing={3}>
              <HStack justify="space-between">
                <Text fontWeight="bold">신고자: {report.reporter}</Text>
                <Text color="red.500">{report.reason}</Text>
              </HStack>
              <Divider />
              <Text>{report.content}</Text>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
}
