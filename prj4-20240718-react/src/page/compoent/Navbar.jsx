import { useNavigate } from "react-router-dom";
import { Box, Center, Flex, Hide, Show, Spacer } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPencil,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  return (
    <Flex
      px={{
        lg: 200,
        base: 0,
      }}
      gap={3}
      height={20}
      bgColor="gray.100"
    >
      <Center
        onClick={() => navigate("/")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
        p={6}
        fontSize={20}
        fontWeight={600}
      >
        <Show below={"lg"}>
          <FontAwesomeIcon icon={faHouse} />
        </Show>
        <Hide below={"lg"}>HOME</Hide>
      </Center>
      {account.isLoggedIn() && (
        <Center
          onClick={() => navigate("/write")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
        >
          <Show below={"lg"}>
            <FontAwesomeIcon icon={faPencil} />
          </Show>
          <Hide below={"lg"}>글쓰기</Hide>
        </Center>
      )}
      <Spacer />
      {account.isLoggedIn() && (
        <Center
          onClick={() => navigate(`/member/${account.id}`)}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
        >
          <Flex gap={2}>
            <Box>
              <FontAwesomeIcon icon={faUser} />
            </Box>
            <Box>
              <Hide below={"lg"}>{account.nickName}</Hide>
            </Box>
          </Flex>
        </Center>
      )}
      {account.isAdmin() && (
        <Center
          onClick={() => navigate("/member/list")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
        >
          <FontAwesomeIcon icon={faUsers} />
        </Center>
      )}
      {account.isLoggedIn() || (
        <Center
          onClick={() => navigate("/signup")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </Center>
      )}
      {account.isLoggedIn() || (
        <Center
          onClick={() => navigate("/login")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
        >
          <FontAwesomeIcon icon={faRightToBracket} />
        </Center>
      )}
      {account.isLoggedIn() && (
        <Center
          onClick={() => {
            account.logout();
            navigate("/login");
          }}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Center>
      )}
    </Flex>
  );
}
