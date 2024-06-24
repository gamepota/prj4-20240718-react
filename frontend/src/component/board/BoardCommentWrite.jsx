import { useContext, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../LoginProvider.jsx";

export function BoardCommentWrite({ boardId, isProcessing, setIsProcessing }) {
  const [boardComment, setBoardComment] = useState("");
  const account = useContext(LoginContext);

  function handleBoardCommentSubmitClick() {
    setIsProcessing(true);
    axios
      .post("/api/comment/add", {
        boardId,
        boardComment,
      })
      .then(() => {
        setBoardComment("");
      })
      .catch(() => {})
      .finally(() => {
        setIsProcessing(false);
      });
  }
  // console.log(account);

  if (!account) {
    return <Spinner />;
  }
  return (
    <Flex gap={2}>
      <Box flex={1}>
        <Textarea
          // isDisabled={!account.isLoggedIn()}
          placeholder={"댓글을 작성해 보세요"}
          value={boardComment}
          onChange={(e) => setBoardComment(e.target.value)}
        />
      </Box>
      <Box>
        <Tooltip
          label="로그인 하세요"
          // isDisabled={account.isLoggedIn()}
          placement="bottom"
        >
          <Button
            h={"100%"}
            // isDisabled={
            //   boardComment.trim().length === 0 || !account.isLoggedIn()
            // }
            isLoading={isProcessing}
            onClick={handleBoardCommentSubmitClick}
            colorScheme={"blue"}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Tooltip>
      </Box>
    </Flex>
  );
}
