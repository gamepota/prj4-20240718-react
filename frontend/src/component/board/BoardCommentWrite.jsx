import { useContext, useState } from "react";
import { Box, Button, Flex, Textarea, Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { LoginContext } from "../place/LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
      .catch(() => {})
      .finally(() => {
        setIsProcessing(false);
      });
  }
  return (
    <Flex gap={2}>
      <Box flex={1}>
        <Textarea
          isDisabled={!account.isLoggedIn()}
          placeholder={
            account.isLoggedIn()
              ? "댓글을 작성해 보세요."
              : "댓글을 작성하시려면 로그인하세요."
          }
          value={boardComment}
          onChange={(e) => setBoardComment(e.target.value)}
        />
      </Box>
      <Box>
        <Tooltip
          label="로그인 하세요"
          isDisabled={account.isLoggedIn()}
          placement="top"
        >
          <Button
            h={"100%"}
            isDisabled={
              boardComment.trim().length === 0 || !account.isLoggedIn()
            }
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
