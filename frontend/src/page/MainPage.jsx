import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Input,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { faFire, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KakaoMap2 from "../KakaoMap2.jsx";

const podiumMargins = {
  1: "0px",
  2: "100px",
  3: "100px",
};

const badgeColors = {
  1: "gold",
  2: "silver",
  3: "#cd7f32", // bronze
};

const PetProfile = ({ imgSrc, rank }) => {
  const handleError = (e) => {
    console.error(`Failed to load image: ${imgSrc}`, e);
  };

  const badgeStyles = {
    1: {
      background: "linear-gradient(145deg, #ffd700, #f0c431)",
      boxShadow:
        "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 -1px 1px rgba(255, 255, 255, 0.2)",
    },
    2: {
      background: "linear-gradient(145deg, #c0c0c0, #b0b0b0)",
      boxShadow:
        "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 -1px 1px rgba(255, 255, 255, 0.2)",
    },
    3: {
      background: "linear-gradient(145deg, #cd7f32, #c67c2f)",
      boxShadow:
        "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 -1px 1px rgba(255, 255, 255, 0.2)",
    },
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
          backgroundImage="url('/img/golden laurel wreath gold.png')"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          zIndex={0}
          width="200px"
          height="200px"
          clipPath="inset(0% 0% 10% 0%)"
        />
      )}
      <Badge
        position="absolute"
        top="10px"
        left="10px"
        bg={badgeColors[rank]}
        color="black"
        fontWeight="bold"
        borderRadius="full"
        width="40px"
        height="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="1.2rem"
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.3), inset 0px -1px 1px rgba(255, 255, 255, 0.2)"
        background={`radial-gradient(circle, ${badgeColors[rank]} 50%, rgba(255, 255, 255, 0.5) 100%)`}
        zIndex={2}
      >
        {rank}
      </Badge>
      <Image
        src={imgSrc}
        borderRadius="full"
        boxSize="150px"
        mb={2}
        zIndex={1}
        onError={handleError}
      />
    </Box>
  );
};

const PetInfoTable = ({ data, onRowClick }) => {
  const tableHeaderBg = useColorModeValue("gray.200", "gray.700");
  const rowHoverBg = useColorModeValue("gray.100", "gray.600");

  return (
    <Table variant="simple" size="md" borderRadius="md">
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
          <Tr
            key={index}
            _hover={{ bg: rowHoverBg }}
            onClick={() => onRowClick(row.id)}
          >
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
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleMapClick = () => {
    navigate("place-map3");
  };

  const handleSearchClick = () => {
    const searchParams = new URLSearchParams();
    searchParams.append("keyword", searchQuery);
    navigate(`board/list?${searchParams.toString()}`);
  };

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

    const fetchTopLikedImages = async () => {
      try {
        const res = await axios.get("/api/board/topLikedImages");
        setTopLikedImages(res.data);
      } catch (error) {
        console.error("Error fetching top liked images:", error);
      }
    };

    fetchLatestBoards();
    fetchPopularBoards();
    fetchTopLikedImages();
  }, []);

  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Box textAlign="center" mt={8}>
        <Box mt={10} mb={5}>
          <Text>반려인들을 위한 커뮤니티, 펫밀리</Text>
        </Box>
        <Image src="/img/petmily-logo.png" w="20%" mx="auto" mb={4} />
        <Flex justifyContent="center" mb={8}>
          <Input
            type="text"
            placeholder="통합 검색"
            borderRadius="md"
            borderColor="gray.300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
            width="25%"
          />
          <Button
            bgColor="purple.100"
            _hover={{ bgColor: "purple.200" }}
            ml={2}
            fontWeight="bold"
            onClick={handleSearchClick}
            isDisabled={!searchQuery.trim()}
          >
            검색
          </Button>
        </Flex>
      </Box>

      <Text
        fontSize="2rem"
        fontWeight="extrabold"
        textAlign="center"
        color="purple.500"
        textShadow="1px 1px 4px rgba(0, 0, 0, 0.2)"
        mt={16}
      >
        펫밀리의 인기 가족을 소개합니다
      </Text>

      <Flex justify="space-evenly" align="center" mb={12}>
        {topLikedImages.slice(0, 3).map((img, index) => (
          <Flex
            direction="column"
            justify="center"
            alignItems="center"
            m={4}
            key={index}
          >
            <Image
              src={img.imageUrl}
              borderRadius="full"
              boxSize="150px"
              mb={2}
              zIndex={1}
            />
            <Badge
              colorScheme={
                index === 0 ? "yellow" : index === 1 ? "gray" : "brown"
              }
              fontSize="1.2rem"
              boxShadow="0px 4px 6px rgba(0, 0, 0, 0.3)"
              borderRadius="full"
              px={4}
              py={1}
            >
              {index + 1}
            </Badge>
          </Flex>
        ))}
      </Flex>

      <Flex justify="space-around" mb={8} wrap="wrap" gap={8}>
        <Box
          flex="1"
          minW="300px"
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.05)" }}
        >
          <Flex alignItems="center" mb={2}>
            <StarIcon color="teal.500" boxSize={6} mr={2} />
            <Text fontSize="2xl" fontWeight="bold" color="teal.500">
              New
            </Text>
          </Flex>
          <SimpleGrid columns={1} spacing={4}>
            {latestBoards.slice(0, 3).map((board) => (
              <Box
                key={board.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                cursor="pointer"
                onClick={() => navigate(`/board/${board.id}`)}
                _hover={{ bg: "gray.200" }}
                bg={bg}
                display="flex"
                alignItems="center"
              >
                {board.fileList && board.fileList.length > 0 && (
                  <Box mb={2} width="100px" height="100px" overflow="hidden">
                    <Image
                      src={board.fileList[0].src}
                      alt="썸네일"
                      borderRadius="md"
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  </Box>
                )}
                <Box ml={4}>
                  <Box fontWeight="bold" as="h4" fontSize="lg" mb={2}>
                    {board.title}
                  </Box>
                  <Box fontSize="sm" color="gray.600" mb={2}>
                    {board.writer}
                  </Box>
                  <Box>
                    {board.numberOfImages > 0 && (
                      <Badge ml={2}>
                        {board.numberOfImages}
                        <FontAwesomeIcon icon={faImage} />
                      </Badge>
                    )}
                    {board.numberOfComments > 0 && (
                      <span> [{board.numberOfComments}]</span>
                    )}
                  </Box>
                  <Box mt={2} fontSize="sm" color="gray.500">
                    <span>추천수: {board.numberOfLikes}</span>
                    <span>조회수: {board.views}</span>
                  </Box>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Box
          flex="1"
          minW="300px"
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.05)" }}
        >
          <Flex alignItems="center" mb={2}>
            <FontAwesomeIcon
              icon={faFire}
              color="red"
              size="2x"
              style={{ marginRight: "8px" }}
            />
            <Text fontSize="2xl" fontWeight="bold" color="red.500">
              Hot
            </Text>
          </Flex>
          <SimpleGrid columns={1} spacing={4}>
            {popularBoards.slice(0, 3).map((board) => (
              <Box
                key={board.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                cursor="pointer"
                onClick={() => navigate(`/board/${board.id}`)}
                _hover={{ bg: "gray.200" }}
                bg={bg}
                display="flex"
                alignItems="center"
              >
                {board.fileList && board.fileList.length > 0 && (
                  <Box mb={2} width="100px" height="100px" overflow="hidden">
                    <Image
                      src={board.fileList[0].src}
                      alt="썸네일"
                      borderRadius="md"
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  </Box>
                )}
                <Box ml={4}>
                  <Box fontWeight="bold" as="h4" fontSize="lg" mb={2}>
                    {board.title}
                  </Box>
                  <Box fontSize="sm" color="gray.600" mb={2}>
                    {board.writer}
                  </Box>
                  <Box>
                    {board.numberOfImages > 0 && (
                      <Badge ml={2}>
                        {board.numberOfImages}
                        <FontAwesomeIcon icon={faImage} />
                      </Badge>
                    )}
                    {board.numberOfComments > 0 && (
                      <span> [{board.numberOfComments}]</span>
                    )}
                  </Box>
                  <Box mt={2} fontSize="sm" color="gray.500">
                    <span>추천수: {board.numberOfLikes}</span>
                    <span>조회수: {board.views}</span>
                  </Box>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>

      <Flex justify="flex-start" p={4} mb={8}>
        <Box
          flex="1"
          minW="300px"
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.05)" }}
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            근처 동물 병원 보기
          </Text>
          <Box
            mx={"auto"}
            w={"100%"}
            maxW={"600px"}
            h={"400px"}
            onClick={handleMapClick}
          >
            <KakaoMap2 />
          </Box>
        </Box>

        <Box
          flex="1"
          minW="300px"
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.05)" }}
          ml={4}
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            반려인 가이드
          </Text>
          <SimpleGrid columns={1} spacing={4}>
            {latestBoards.slice(0, 3).map((board) => (
              <Box
                key={board.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                cursor="pointer"
                onClick={() => navigate(`/board/${board.id}`)}
                _hover={{ bg: "gray.200" }}
                bg={bg}
                display="flex"
                alignItems="center"
              >
                {board.fileList && board.fileList.length > 0 && (
                  <Box mb={2} width="100px" height="100px" overflow="hidden">
                    <Image
                      src={board.fileList[0].src}
                      alt="썸네일"
                      borderRadius="md"
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  </Box>
                )}
                <Box ml={4}>
                  <Box fontWeight="bold" as="h4" fontSize="lg" mb={2}>
                    {board.title}
                  </Box>
                  <Box fontSize="sm" color="gray.600" mb={2}>
                    {board.writer}
                  </Box>
                  <Box>
                    {board.numberOfImages > 0 && (
                      <Badge ml={2}>
                        {board.numberOfImages}
                        <FontAwesomeIcon icon={faImage} />
                      </Badge>
                    )}
                    {board.numberOfComments > 0 && (
                      <span> [{board.numberOfComments}]</span>
                    )}
                  </Box>
                  <Box mt={2} fontSize="sm" color="gray.500">
                    <span>추천수: {board.numberOfLikes}</span>
                    <span>조회수: {board.views}</span>
                  </Box>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
};
