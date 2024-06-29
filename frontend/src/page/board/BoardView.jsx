// BoardView.jsx
import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
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
import { generateDiaryId } from "../../util/util.jsx";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ReportModal from "./ReportModal";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [like, setLike] = useState({
    like: false,
    count: 0,
  });
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenReport,
    onOpen: onOpenReport,
    onClose: onCloseReport,
  } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const { memberInfo } = useContext(LoginContext);
  const memberId = memberInfo && memberInfo.id ? parseInt(memberInfo.id) : null;
  const params = memberId ? { memberId } : {};

  const [selectedWriter, setSelectedWriter] = useState(null);
  const [selectedWriterId, setSelectedWriterId] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/board/${id}`, { params })
      .then((res) => {
        setBoard(res.data.board);
        setLike(res.data.like);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다",
            position: "top",
            duration: 500,
          });
        }
      });
  }, [id]);

  if (board === null) {
    return <Spinner />;
  }

  const handleClickRemove = () => {
    axios
      .delete(`/api/board/${board.id}`, { params })
      .then(() => {
        toast({
          status: "success",
          description: `${id}번 게시물이 삭제되었습니다`,
          position: "top",
          duration: 10,
        });
        navigate(`/`);
      })
      .catch(() => {
        toast({
          status: "error",
          description: "잘못된 삭제 명령입니다",
          position: "top",
          duration: 10,
        });
      })
      .finally(onCloseDelete);
  };

  const handleClickLike = () => {
    if (!memberInfo) {
      return;
    }
    setIsLikeProcessing(true);
    axios
      .put("/api/board/like", { boardId: board.id, memberId: memberInfo.id })
      .then((res) => {
        setLike(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLikeProcessing(false);
      });
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
    <Box maxW="800px" m="auto" p={6} boxShadow="lg" borderRadius="md" mt={10}>
      <Box p={4} bg="gray.100" borderRadius="md" boxShadow="md" mb={4}>
        <Flex justify="space-between" align="center" mb={2}>
          <Box fontWeight="bold" fontSize="xl">
            {board.title}
          </Box>
          <Flex align="center">
            <Box fontSize="sm" color="gray.600" mr={2}>
              {new Date(board.inserted).toLocaleString()}
            </Box>
            <Popover>
              <PopoverTrigger>
                <Badge
                  cursor="pointer"
                  color="blue.600"
                  onClick={() =>
                    handleWriterClick(board.writer, board.memberId)
                  }
                >
                  {board.writer}
                </Badge>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <Button colorScheme="blue" onClick={handleDiaryView}>
                    작성자 다이어리 보기
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>
        <Flex justify="space-between" align="center">
          <Box>조회수: {board.views}</Box>
          <Box>추천수: {like.count}</Box>
        </Flex>
      </Box>
      <Box p={4} bg="white" borderRadius="md" boxShadow="md">
        {board.fileList &&
          board.fileList.map((file) => (
            <Box key={file.name} mb={3}>
              <Image src={file.src} alt={file.name} borderRadius="md" />
            </Box>
          ))}
        {board.content}
      </Box>
      <Flex mb={4} align="center">
        <Tooltip isDisabled={memberInfo} hasArrow label="로그인 해주세요.">
          <Box onClick={handleClickLike} cursor="pointer" fontSize="3xl">
            {like.like ? (
              <FontAwesomeIcon icon={fullHeart} />
            ) : (
              <FontAwesomeIcon icon={emptyHeart} />
            )}
          </Box>
        </Tooltip>
        {like.count > 0 && (
          <Box mx={3} fontSize="3xl">
            {like.count}
          </Box>
        )}
        <Spacer />
        <Button
          onClick={() => {
            if (!memberInfo) {
              toast({
                description: "로그인 해주시길 바랍니다",
                duration: 5000,
                position: "top",
                isClosable: "true",
              });
            } else {
              onOpenReport();
            }
          }}
        >
          신고
        </Button>
        {isLikeProcessing && (
          <Box ml={2}>
            <Spinner size="sm" />
          </Box>
        )}
      </Flex>
      <BoardCommentComponent boardId={board.id} />
      {(memberId === board.memberId || memberId == 1) && (
        <Flex justify="flex-end">
          <Button
            colorScheme="purple"
            onClick={() => navigate(`/board/edit/${id}`)}
            mr={2}
          >
            수정
          </Button>
          <Button colorScheme="red" onClick={onOpenDelete}>
            삭제
          </Button>
        </Flex>
      )}
      <DeleteConfirmationModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onClickRemove={handleClickRemove}
      />
      <ReportModal
        isOpen={isOpenReport}
        onClose={onCloseReport}
        boardId={board.id}
        memberId={board.memberId}
      />
    </Box>
  );
}

export default BoardView;
