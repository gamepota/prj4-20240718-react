import React from "react";
import { Box, Heading, Flex, useColorModeValue } from "@chakra-ui/react";
import KakaoMap from "../../KakaoMap.jsx";

export function PlaceMap() {
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("black", "white");

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      minH="100vh"
      bg={bg}
      color={color}
      p={5}
    >
      <Heading mb={5}>근처 동물 병원 보기</Heading>
      <Box
        w="full"
        maxW="1000px"
        h="600px"
        borderRadius="md"
        overflow="hidden"
        boxShadow="lg"
      >
        <KakaoMap />
      </Box>
    </Flex>
  );
}
