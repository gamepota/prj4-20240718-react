import React, { useEffect, useState } from "react";
import {
  Box,
  Center, Fade,
  Flex,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import KakaoMap2 from "../KakaoMap2.jsx";

const PetProfile = ({ name, imgSrc }) => (
  <Box textAlign="center" m={4}>
    <Image src={imgSrc} borderRadius="full" boxSize="150px" mb={2} />
    <Text fontWeight="bold" fontSize="md">
      {name}
    </Text>
  </Box>
);

const PetInfoTable = ({ data }) => (
  <Table variant="simple" size="md" boxShadow="md" borderRadius="md">
    <Thead bg={useColorModeValue("gray.200", "gray.700")}>
      <Tr>
        <Th>No.</Th>
        <Th>Title</Th>
        <Th>Writer</Th>
        <Th>Likes</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data.map((row, index) => (
        <Tr
          key={index}
          _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
        >
          <Td>{index + 1}</Td>
          <Td>{row.title}</Td>
          <Td>{row.writer}</Td>
          <Td>{row.number_of_likes}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export const MainPage = () => {
  const [latestBoards, setLatestBoards] = useState([]);
  const [popularBoards, setPopularBoards] = useState([]);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const fetchLatestBoards = async () => {
      try {
        const res = await axios.get("/api/board/latest");
        setLatestBoards(res.data);
      } catch (error) {
        console.error("Error fetching latest boards:", error);
      }
    };

    const fetchPopularBoards = async () => {
      try {
        const res = await axios.get("/api/board/popular");
        setPopularBoards(res.data);
      } catch (error) {
        console.error("Error fetching popular boards:", error);
      }
    };

    fetchLatestBoards();
    fetchPopularBoards();

    const isFirstVisit = !sessionStorage.getItem("visited");
    if (isFirstVisit) {
      setShowLogo(true);
      sessionStorage.setItem("visited", "true");
      setTimeout(() => {
        setShowLogo(false);
      }, 2000); // 2초 후 로고 페이드아웃
    }
  }, []);

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Fade in={showLogo} unmountOnExit>
        <Flex
          justify="center"
          align="center"
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100vh"
          bg="#F8F8FF"
          zIndex="1000"
        >
          <Image src="/img/petmily-logo.png" w="25%" />
        </Flex>
      </Fade>
      <Flex justify="center" p={4} mb={8}>
        <Text fontSize="2xl" fontWeight="bold">
          내 반려동물을 소개합니다.
        </Text>
      </Flex>
      <Flex justify="space-around" mb={8} wrap="wrap">
        <PetProfile name="똘기" imgSrc="/img/곰벌레.jpg" />
        <PetProfile name="땡이" imgSrc="/img/리트리버즈.jpg" />
        <PetProfile name="호치" imgSrc="/img/벌거숭이두더지쥐.jpg" />
        <PetProfile name="새초미" imgSrc="/img/코알라.jpg" />
      </Flex>
      <Flex justify="space-around" mb={8} wrap="wrap" gap={8}>
        <Box flex="1" minW="300px">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            최신 게시물
          </Text>
          <PetInfoTable data={latestBoards} />
        </Box>
        <Box flex="1" minW="300px">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            인기 게시물
          </Text>
          <PetInfoTable data={popularBoards} />
        </Box>
      </Flex>
      <Flex justify="center" p={4} mb={8}>
        <Text fontSize="lg" fontWeight="bold">
          근처 동물 병원 보기
        </Text>
      </Flex>
      <Flex justify="center">
        <Box mx={"auto"} w={"100%"} maxW={"600px"} h={"400px"}>
          <KakaoMap2 />
        </Box>
      </Flex>
    </Box>
  );
};
