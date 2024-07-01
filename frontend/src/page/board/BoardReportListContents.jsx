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
  const [board, setBoard] = useState({});
  const [reports, setReports] = useState([]);
  const { boardId, repoterMemberId } = location.state || {};

  useEffect(() => {
    if (boardId) {
      axios
        .get(`/api/board/report/list/content`, {
          params: { boardId, repoterMemberId },
        })
        .then((res) => {
          setBoard(res.data.board);
          setReports(res.data.reports);
        })
        .catch((error) => {
          console.error("Error fetching report content:", error);
        });
    }
  }, [boardId, repoterMemberId]);

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={4} align="stretch">
        {reports.map(
          (
            report, // 변수명을 report로 수정
          ) => (
            <Box
              key={report.boardId}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              shadow="md"
            >
              <VStack align="stretch" spacing={3}>
                <HStack justify="space-between">
                  <Text fontWeight="bold">신고자: {report.reporter}</Text>
                  <Text color="red.500">{report.content}</Text>
                </HStack>
                <Divider />
                <Text>{report.reportType}</Text>
              </VStack>
            </Box>
          ),
        )}
      </VStack>
    </Container>
  );
}
