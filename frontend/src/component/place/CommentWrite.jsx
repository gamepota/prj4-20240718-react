import { Box, Button, Textarea, Tooltip, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../LoginProvider.jsx";
import { StarRating } from "./StarRating.jsx";

export function CommentWrite({ hospitalId, isProcessing, setIsProcessing }) {
  const [comment, setComment] = useState("");
  const [ratingIndex, setRatingIndex] = useState(1);
  const toast = useToast();
  const memberInfo = useContext(LoginContext);
  const access = memberInfo.access;
  const isLoggedIn = Boolean(access);

  if (!memberInfo) {
    return null; // 또는 로딩 스피너를 표시할 수 있습니다.
  }

  async function handleCommentSubmitClick() {
    setIsProcessing(true);

    try {
      await axios.post("/api/hospitalComment/add", {
        hospitalId,
        comment,
        memberInfo,
      });

      await axios.post("/api/hospitalComment/rating", {
        hospitalId,
        rating: ratingIndex,
        username: memberInfo.username,
      });

      setComment("");
      toast({
        description: "댓글이 등록되었습니다.",
        position: "top",
        status: "success",
      });
    } catch (err) {
      toast({
        description: "댓글 등록에 실패했습니다.",
        position: "top",
        status: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <Box>
      <StarRating ratingIndex={ratingIndex} setRatingIndex={setRatingIndex} />
      <Textarea
        isDisabled={isLoggedIn}
        placeholder={
          isLoggedIn
            ? "리뷰를 작성해 보세요."
            : "리뷰를 작성하시려면 로그인하세요."
        }
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Tooltip label="로그인 하세요" isDisabled={isLoggedIn} placement="top">
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
