import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Center,
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
import axios from "axios";
import KakaoMap2 from "../KakaoMap2.jsx";

const podiumMargins = {
  1: "0px",
  2: "30px",
  3: "60px",
};

const PetProfile = ({ name, imgSrc, rank }) => {
  console.log("Rendering PetProfile with imgSrc:", imgSrc);

  const handleError = (e) => {
    console.error(`Failed to load image: ${imgSrc}`, e);
  };

  return (
    <Box
      textAlign="center"
      m={4}
      position="relative"
      marginTop={podiumMargins[rank]}
      height="auto"
      width="200px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {rank === 1 && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          backgroundImage="public/img/golden laurel wreath gold.png"
          backgroundSize="contain"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          zIndex={0}
          width="200px"
          height="200px"
          clipPath="inset(0% 0% 10% 0%)" // 하단 20%를 자르기 위해 clip-path 사용
        />
      )}
      <Image
        src={imgSrc}
        borderRadius="full"
        boxSize="150px"
        mb={2}
        zIndex={1}
        onError={handleError}
      />
      <Badge
        position="absolute"
        top="-10px"
        left="-10px"
        bg="yellow"
        color="black"
        fontWeight="bold"
        borderRadius="full"
        width="40px"
        height="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="1.2rem"
        boxShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
      >
        {rank}
      </Badge>
      <Text fontWeight="bold" fontSize="md">
        {name}
      </Text>
    </Box>
  );
};

const PetInfoTable = ({ data }) => {
  const tableHeaderBg = useColorModeValue("gray.200", "gray.700");
  const rowHoverBg = useColorModeValue("gray.100", "gray.600");

  return (
    <Table variant="simple" size="md" boxShadow="md" borderRadius="md">
      <Thead bg={tableHeaderBg}>
        <Tr>
          <Th>No.</Th>
          <Th>Title</Th>
          <Th>Writer</Th>
          <Th>Likes</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <Tr key={index} _hover={{ bg: rowHoverBg }}>
            <Td>{index + 1}</Td>
            <Td>{row.title}</Td>
            <Td>{row.writer}</Td>
            <Td>{row.numberOfLikes}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export const MainPage = () => {
  const [latestBoards, setLatestBoards] = useState([]);
  const [popularBoards, setPopularBoards] = useState([]);
  const [topLikedImages, setTopLikedImages] = useState([]);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const fetchLatestBoards = async () => {
      try {
        console.log("Fetching latest boards...");
        const res = await axios.get("/api/board/latest");
        console.log("Latest boards fetched:", res.data);
        setLatestBoards(res.data);
      } catch (error) {
        console.error("Error fetching latest boards:", error);
      }
    };

    const fetchPopularBoards = async () => {
      try {
        console.log("Fetching popular boards...");
        const res = await axios.get("/api/board/popular");
        console.log("Popular boards fetched:", res.data);
        setPopularBoards(res.data);
      } catch (error) {
        console.error("Error fetching popular boards:", error);
      }
    };

    const fetchTopLikedImages = async () => {
      try {
        console.log("Fetching top liked images...");
        const res = await axios.get("/api/board/topLikedImages");
        console.log("Top liked images fetched:", res.data);
        setTopLikedImages(res.data);
      } catch (error) {
        console.error("Error fetching top liked images:", error);
      }
    };

    fetchLatestBoards();
    fetchPopularBoards();
    fetchTopLikedImages();

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
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        mb={8}
        textAlign="center"
        bg="white"
        boxShadow="md"
      >
        <Text
          fontSize="2.5rem"
          fontWeight="bold"
          textAlign="center"
          color="#ff6347"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
          mb={8}
        >
          펫밀리 4대 천왕
        </Text>
        <Flex justify="space-evenly" align="center" mb={8}>
          <Flex direction="column" justify="center" alignItems="center" m={4}>
            {topLikedImages[1] && (
              <PetProfile
                key={1}
                name="2위"
                imgSrc={topLikedImages[1].imageUrl}
                rank={2}
              />
            )}
          </Flex>
          <Flex direction="column" justify="center" alignItems="center" m={4}>
            {topLikedImages[0] && (
              <PetProfile
                key={0}
                name="1위"
                imgSrc={topLikedImages[0].imageUrl}
                rank={1}
              />
            )}
          </Flex>
          <Flex direction="column" justify="center" alignItems="center" m={4}>
            {topLikedImages[2] && (
              <PetProfile
                key={2}
                name="3위"
                imgSrc={topLikedImages[2].imageUrl}
                rank={3}
              />
            )}
          </Flex>
        </Flex>
      </Box>
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
