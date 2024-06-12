import { Box } from "@chakra-ui/react";
import { CommentList } from "./CommentList.jsx";
import { CommentWrite } from "./CommentWrite.jsx";
import { useState } from "react";

export function CommentComponent({ hospitalId }) {
  const [isSending, setIsSending] = useState(false);
  return (
    <Box>
      <CommentWrite
        hospitalId={hospitalId}
        isSending={isSending}
        setIsSending={setIsSending}
      />
      <CommentList hospitalId={hospitalId} />
    </Box>
  );
}
