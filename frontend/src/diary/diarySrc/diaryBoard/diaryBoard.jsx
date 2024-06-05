import React from "react";
import { Box, Button } from "@chakra-ui/react";
import axios from "axios";

function DiaryBoard(props) {
  function handleClickHome() {
    axios.get("/DiaryHome");
  }

  function handleClickComment() {
    axios.get("/");
  }

  return (
    <Box>
      <Box>
        <Button onClick={handleClickHome}>홈</Button>
        <Button onClick={handleClickComment}>방명록</Button>
        <Button onClick={handleClickGallery}>사진첩</Button>
      </Box>
    </Box>
  );
}

export default DiaryBoard;
