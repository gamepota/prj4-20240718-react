import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Tooltip,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BoardCommentComponent } from "../../component/board/BoardCommentComponent.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { generateDiaryId } from "../../util/util.jsx";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [like, setLike] = useState({
    like: false,
    count: 0,
  });
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const { memberInfo } = useContext(LoginContext);
  const memberId = memberInfo && memberInfo.id ? parseInt(memberInfo.id) : null;
  const params = memberId ? { memberId } : {};

  const [selectedWriter, setSelectedWriter] = useState(null);
  const [selectedWriterId, setSelectedWriterId] = useState(null);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`/api/board/${id}`);
        setBoard(response.data.board);
        setLike(response.data.like);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다",
            position: "top",
            duration: 500,
          });
        } else {
          console.error(err);
        }
      }
    };

    fetchBoardData();
  }, [id, toast]);

  const handleClickRemove = async () => {
    try {
      await axios.delete(`/api/board/${board.id}`);
      toast({
        status: "success",
        description: `${id}번 게시물이 삭제되었습니다`,
        position: "top",
        duration: 3000,
      });
      navigate(`/`);
    } catch (err) {
      toast({
        status: "error",
        description: "잘못된 삭제 명령입니다",
        position: "top",
        duration: 3000,
      });
    } finally {
      onClose();
    }
  };

  const handleClickLike = async () => {
    if (!memberInfo) {
      return;
    }
    setIsLikeProcessing(true);
    try {
      const response = await axios.put("/api/board/like", { boardId: board.id, memberId: memberInfo.id });
      setLike(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLikeProcessing(false);
    }
  };

  const handleWriterClick = (writer, writerId) => {
    setSelectedWriter(writer);
    setSelectedWriterId(writerId);
  };

  const handleDiaryView = () => {
    const diaryId = generateDiaryId(selectedWriterId);
    const url = `/diary/${diaryId}`;
    const windowFeatures = "width=1400,height=800";
    window.open(url, "_blank", windowFeatures);
  };

  return (
    <Box maxW="800px" m="auto" p={6} boxShadow="lg" borderRadius="md" mt={10} bg="gray.50">
      {board ? (
        <>
          <Box p={4} bg="white" borderRadius="md" boxShadow="md" mb={4}>
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontWeight="bold" fontSize="2xl" color="teal.500">
                {board.title}
              </Text>
              <Flex align="center">
                <Text fontSize="sm" color="gray.600" mr={2}>
                  {new Date(board.inserted).toLocaleString()}
                </Text>
                <Popover>
                  <PopoverTrigger>
                    <Badge
                      cursor="pointer"
                      colorScheme="teal"
                      onClick={() => handleWriterClick(board.writer, board.memberId)}
                    >
                      {board.writer}
                    </Badge>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Button colorScheme="teal" onClick={handleDiaryView}>
                        작성자 다이어리 보기
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
            </Flex>
            <Flex justify="space-between" align="center" mt={2}>
              <Text fontSize="md" color="gray.600">조회수: {board.views}</Text>
              <Text fontSize="md" color="gray.600">추천수: {like.count}</Text>
            </Flex>
          </Box>
          <Box p={4} bg="white" borderRadius="md" boxShadow="md" mb={4}>
            {board.fileList &&
              board.fileList.map((file) => (
                <Box key={file.name} mb={3}>
                  <Image src={file.src} alt={file.name} borderRadius="md" />
                </Box>
              ))}
            <Text fontSize="md" color="gray.800">{board.content}</Text>
          </Box>
          <Flex mb={4} align="center">
            <Tooltip isDisabled={memberInfo} hasArrow label="로그인 해주세요.">
              <Box onClick={handleClickLike} cursor="pointer" fontSize="3xl">
                {like.like ? (
                  <FontAwesomeIcon icon={fullHeart} color="teal" />
                ) : (
                  <FontAwesomeIcon icon={emptyHeart} color="teal" />
                )}
              </Box>
            </Tooltip>
            {like.count > 0 && (
              <Text mx={3} fontSize="3xl" color="teal.500">
                {like.count}
              </Text>
            )}
            {isLikeProcessing && (
              <Box ml={2}>
                <Spinner size="sm" />
              </Box>
            )}
          </Flex>
          <BoardCommentComponent boardId={board.id} />
          {memberId === board.memberId && (
            <Flex mt={4} justify="flex-end" gap={2}>
              <Button colorScheme="teal" onClick={() => navigate(`/board/edit/${id}`)}>
                수정
              </Button>
              <Button colorScheme="red" onClick={onOpen}>
                삭제
              </Button>
            </Flex>
          )}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>게시물 삭제</ModalHeader>
              <ModalCloseButton />
              <ModalBody>정말로 삭제하시겠습니까?</ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>취소</Button>
                <Button colorScheme="red" onClick={handleClickRemove}>
                  확인
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Flex justify="center" align="center" h="100vh">
          <Spinner size="xl" />
        </Flex>
      )}
    </Box>
  );
}
