import {Box, Flex} from "@chakra-ui/react";
import React from "react";
import {useNavigate} from "react-router-dom";


export function Navbar() {
  const navigate = useNavigate();
  return(
    <Flex>
      <Box
        _hover={{cursor: "pointer", bgColor: "gray.200"}}
        onClick={() => navigate("/")}>
        Home
      </Box>
    </Flex>
  );
}