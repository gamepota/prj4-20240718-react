import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function DiaryNavbar() {
  const navigate = useNavigate();

  return (
    <Flex boxSize={"100%"} h={"50px"} alignContent={"space-between"} gap={5}>
      <Box>
        <Button
          onClick={() => navigate("/diary/home")}
          cursor={"pointer"}
          _hover={{
            bgColor: "blue.200",
          }}
        >
          홈
        </Button>
      </Box>
      {/*<Box>*/}
      {/*<Button*/}
      {/*  onClick={() => navigate("/diary/comment/list")}*/}
      {/*  cursor={"pointer"}*/}
      {/*  _hover={{*/}
      {/*    bg: "blue.200",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  방명록*/}
      {/*</Button>*/}
      {/*</Box>*/}
      <Box>
        <Button
          onClick={() => navigate("/diary/list")}
          cursor={"pointer"}
          _hover={{
            bgColor: "blue.200",
          }}
        >
          내 다이어리
        </Button>
      </Box>
      <Box>
        <Button
          onClick={() => navigate("/diary/schedule")}
          cursor={"pointer"}
          _hover={{
            bg: "blue.200",
          }}
        >
          접종 날짜
        </Button>
      </Box>
    </Flex>
  );
}
