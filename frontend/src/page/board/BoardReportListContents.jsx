import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Container,
  Divider,
  HStack,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export function BoardReportListContents() {
  const location = useLocation();
  const [board, setBoard] = useState({});
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching report content:", error);
          setIsLoading(false);
        });
    }
  }, [boardId, repoterMemberId]);

  if (isLoading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={6} align="stretch">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          bg={bg}
          shadow="md"
          borderColor={borderColor}
        >
          <VStack align="stretch" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold" color="red.500">
              게시물 내용
            </Text>
            <Divider />
            <Text fontWeight="bold">{board.title}</Text>
            <Text>{board.content}</Text>
          </VStack>
        </Box>
        {reports.map((report) => (
          <Box
            key={report.boardId}
            borderWidth="1px"
            borderRadius="lg"
            p={6}
            bg={bg}
            shadow="md"
            borderColor={borderColor}
          >
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <Text fontWeight="bold">신고자: {report.reporter}</Text>
                <Text color="red.500">신고 사유: {report.reportType}</Text>
              </HStack>
              <Divider />
              <Text>신고 내용: {report.content}</Text>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
}
