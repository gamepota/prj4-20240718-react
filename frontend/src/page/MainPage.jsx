import React, { useEffect, useState } from "react";
import {
  Box,
  Fade,
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
        <Th>Name</Th>
        <Th>Value</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data.map((row, index) => (
        <Tr
          key={index}
          _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
        >
          <Td>{row.no}</Td>
          <Td>{row.name}</Td>
          <Td>{row.value}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export const MainPage = () => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const isFirstVisit = !sessionStorage.getItem("visited");
    if (isFirstVisit) {
      setShowLogo(true);
      sessionStorage.setItem("visited", "true");
      setTimeout(() => {
        setShowLogo(false);
      }, 2000); // 2초 후 로고 페이드아웃
    }
  }, []);

  const board1 = [
    { no: 1, name: "안녕", value: "나야" },
    { no: 2, name: "잘 지내", value: "내 사랑 안녕" },
    { no: 3, name: "얍얍", value: "캐스터네츠" },
    { no: 4, name: "하늘을 나는", value: "다람쥐" },
    { no: 5, name: "뱅뱅뱅", value: "빵야빵야빵야" },
  ];

  const board2 = [
    { no: 1, name: "신촌을", value: "못가" },
    { no: 2, name: "한 번을", value: "못가" },
    { no: 3, name: "두 번을", value: "못가" },
    { no: 4, name: "세 번을", value: "못가" },
    { no: 5, name: "네 번을", value: "못가" },
  ];

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
            아무 말 게시판
          </Text>
          <PetInfoTable data={board1} />
        </Box>
        <Box flex="1" minW="300px">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            아무 노래 게시판
          </Text>
          <PetInfoTable data={board2} />
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
