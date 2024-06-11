import { Box } from "@chakra-ui/react";
import { CommentList } from "./CommentList.jsx";
import { CommentWrite } from "./CommentWrite.jsx";

export function CommentComponent() {
  return (
    <Box>
      <CommentWrite />
      <CommentList />
    </Box>
  );
}
