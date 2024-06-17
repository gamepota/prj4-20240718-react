import React, {useState} from "react";
import {Box, Button, HStack, IconButton, Text, VStack} from "@chakra-ui/react";
import {ChatIcon, MinusIcon} from "@chakra-ui/icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

const friends = [
  {name: "조강현", online: false},
  {name: "김동원", online: true},
  {name: "박재형", online: false},
  {name: "박재옥", online: false},
  {name: "조강현", online: false},
  {name: "김동원", online: true},
  {name: "박재형", online: false},
  {name: "박재옥", online: false},
  {name: "조강현", online: false},
  {name: "김동원", online: true},
  {name: "박재형", online: false},
  {name: "박재옥", online: false},
];

export const FriendsListComponent = ({onSelectFriend}) => {
  const [nickName, setNickName] = useState()
  const [online, setOnline] = useState()
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <VStack>

      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        borderWidth="1px"
        borderRadius="md"
        p="4"
        bg="white"
        boxShadow="md"
        width="300px"
        h={isMinimized ? "auto" : "400px"}
        overflow="auto"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          position="sticky"
          top="0"
          bg="white"
          zIndex="1"
          borderBottomWidth="1px"
          p={2}
          h="50px"
        >
          <Text fontSize="xl" fontWeight="bold">친구 리스트</Text>
          <IconButton
            icon={isMinimized ? <ChatIcon/> : <MinusIcon/>}
            size="sm"
            onClick={toggleMinimize}
            aria-label={isMinimized ? "Expand List" : "Minimize List"}
          />
        </Box>
        {!isMinimized && (
          <Box mt="4">
            <VStack align="start" spacing={3}>
              {friends.map((friend, index) => (
                <HStack key={index} spacing={3} width="100%" justifyContent="space-between">
                  <HStack spacing={2}>
                    <Box as="span" borderRadius="full" bg={friend.online ? "green.400" : "gray.400"} boxSize="10px"/>
                    <Text>{friend.name}</Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate("diary/home")}
                    >
                      <FontAwesomeIcon icon={faHouse}/>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onSelectFriend(friend.name)}
                    >
                      <ChatIcon/>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onSelectFriend(friend.name)}
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </Button>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </Box>
        )}
      </Box>
    </VStack>
  );
};
