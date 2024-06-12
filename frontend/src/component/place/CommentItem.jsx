import { Box, Button, Flex, Spacer, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const toast = useToast();
  const navigate = useNavigate();
  function handleRemoveClick() {
    setIsProcessing(true);
    axios
      .delete("/api/hospitalComments/remove", {
        data: { id: comment.id },
      })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Box border={"1px solid black"} my={3}>
      <Flex>
        <Box>{comment.nickname}</Box>
        <Spacer />
        <Box>{comment.inserted}</Box>
      </Flex>
      <Flex>
        <Box>{comment.comment}</Box>
        <Spacer />
        <Box>
          <Button
            isLoading={isProcessing}
            colorScheme="red"
            onClick={handleRemoveClick}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
