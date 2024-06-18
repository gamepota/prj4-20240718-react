import { Box, Button, Textarea, Tooltip, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "./LoginProvider.jsx";
import { StarRating } from "./StarRating.jsx";

export function CommentWrite({ hospitalId, isProcessing, setIsProcessing }) {
  const [comment, setComment] = useState("");
  const toast = useToast();
  const account = useContext(LoginContext);

  function handleCommentSubmitClick() {
    setIsProcessing(true);

    axios
      .post("/api/hospitalComment/add", {
        hospitalId,
        comment,
        memberId: account.id,
      })
      .then((res) => {
        setComment("");
        toast({
          description: "댓글이 등록되었습니다.",
          position: "top",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          description: "댓글 등록에 실패했습니다.",
          position: "top",
          status: "error",
        });
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Box>
      <StarRating />
      <Textarea
        isDisabled={!account.isLoggedIn()}
        placeholder={
          account.isLoggedIn()
            ? "리뷰를 작성해 보세요."
            : "리뷰를 작성하시려면 로그인하세요."
        }
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Tooltip
        label="로그인 하세요"
        isDisabled={account.isLoggedIn()}
        placement="top"
      >
        <Button
          isDisabled={comment.trim().length === 0}
          isLoading={isProcessing}
          onClick={handleCommentSubmitClick}
          colorScheme="blue"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </Tooltip>
    </Box>
  );
}
