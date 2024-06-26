import React from "react";
import {
  Box,
  Flex,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import KakaoMap2 from "../KakaoMap2.jsx";

const PetProfile = ({ name, imgSrc }) => (
  <Box textAlign="center">
    <Image src={imgSrc} borderRadius="full" boxSize="150px" mb={2} />
    <Text fontWeight="bold">{name}</Text>
  </Box>
);

const PetInfoTable = ({ data }) => (
  <Table variant="simple" size="sm">
    <Thead>
      <Tr>
        <Th>No.</Th>
        <Th>Name</Th>
        <Th>Value</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data.map((row, index) => (
        <Tr key={index}>
          <Td>{row.no}</Td>
          <Td>{row.name}</Td>
          <Td>{row.value}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export const MainPage = () => {
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
    <Box p={4}>
      <Flex justify="center" p={4} maxW={"70%"}>
        <Text fontSize="xl" fontWeight="bold">
          내 반려동물을 소개합니다.
        </Text>
      </Flex>
      <Flex justify="space-around" mb={4} maxW={"70%"} alignContent={"center"}>
        <PetProfile name="똘기" imgSrc="/img/곰벌레.jpg" />
        <PetProfile name="땡이" imgSrc="/img/리트리버즈.jpg" />
        <PetProfile name="호치" imgSrc="/img/벌거숭이두더지쥐.jpg" />
        <PetProfile name="새초미" imgSrc="/img/코알라.jpg" />
      </Flex>
      <Flex justify="space-around" mb={4} maxW={"70%"}>
        <Box>
          <h3>아무 말 게시판</h3>
          <PetInfoTable data={board1} />
        </Box>
        <Box>
          <h3>아무 노래 게시판</h3>
          <PetInfoTable data={board2} />
        </Box>
      </Flex>

      <Flex justify="center" p={4}>
        <Text fontSize="lg" fontWeight="bold">
          근처 동물 병원 보기
        </Text>
      </Flex>
      <Flex justify="center">
        <Box w={"40%"} h={"40%"}>
          <KakaoMap2 />
        </Box>
      </Flex>
    </Box>
  );
};
