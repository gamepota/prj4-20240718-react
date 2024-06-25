import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BoardCommentComponent } from "../../component/board/BoardCommentComponent.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { LoginContext } from "../../component/LoginProvider.jsx";

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
  // LoginProvider
  const memberInfo = useContext(LoginContext);

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => {
        console.log(res.data);
        setBoard(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다",
            position: "top",
            duration: "500",
          });
        }
      });
  }, [id]);
  if (board === null) {
    return <Spinner />;
  }

  function handleClickRemove() {
    axios
      .delete("/api/board/" + board.id)
      .then(() => {
        toast({
          status: "success",
          description: `${id}번 게시물이 삭제되었습니다`,
          position: "top",
          duration: "100",
        });
        navigate(`/`);
      })
      .finally(() => onClose);
  }

  function handleClickLike() {
    if (!memberInfo) {
      return;
    }

    setIsLikeProcessing(true);
    axios
      .put("/api/board/like", { boardId: board.id, memberId: userId })
      .then((res) => {
        setLike(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLikeProcessing(false);
      });
  }

  return (
    <Box
      // maxW={"500px"}
      m={"auto"}
      p={4}
      boxShadow={"md"}
      borderRadius={"md"}
      mt={10}
    >
      <Flex>
        <Box>{board.id}번 게시물</Box>
        <Spacer />
        <Box>조회수:{board.views}</Box>
        <Box ml={5}>추천수:0</Box>
        <Spacer />
      </Flex>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={board.title} readOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>내용</FormLabel>
          <Input value={board.content} readOnly />
        </FormControl>
      </Box>
      <Box>
        {board.fileList &&
          board.fileList.map((file) => (
            <Box border={"2px solid black"} m={3} key={file.name}>
              <Image src={file.src} />
            </Box>
          ))}
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={board.writer} readOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성 일자</FormLabel>
          <Input type={"datetime-local"} value={board.inserted} readOnly />
        </FormControl>
      </Box>

      {isLikeProcessing || (
        <Flex>
          <Tooltip isDisabled={memberInfo} hasArrow label="로그인 해주세요.">
            <Box onClick={handleClickLike} cursor="pointer" fontSize="3xl">
              {like.like && <FontAwesomeIcon icon={fullHeart} />}
              {like.like || <FontAwesomeIcon icon={emptyHeart} />}
            </Box>
          </Tooltip>
          {like.count > 0 && (
            <Box mx={3} fontSize="3xl">
              {like.count}
            </Box>
          )}
        </Flex>
      )}
      {isLikeProcessing && (
        <Box pr={3}>
          <Spinner />
        </Box>
      )}

      <BoardCommentComponent boardId={board.id} />

      <Box>
        <Button
          colorScheme={"purple"}
          onClick={() => navigate(`/board/edit/${id}`)}
        >
          수정
        </Button>
        <Button colorScheme={"red"} onClick={onOpen}>
          삭제
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제하시곘습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button colorScheme={"red"} onClick={handleClickRemove}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
