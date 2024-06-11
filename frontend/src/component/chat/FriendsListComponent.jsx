import React, { useState } from "react";
import { Box, VStack, HStack, Text, Button, IconButton } from "@chakra-ui/react";
import { MinusIcon, ChatIcon } from "@chakra-ui/icons";

const friends = [
  { name: "조강현", online: false },
  { name: "김동원", online: true },
  { name: "박재형", online: false },
  { name: "박재옥", online: false }
];

export const FriendsListComponent = ({ onSelectFriend }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Box position="fixed" bottom="20px" right="20px" borderWidth="1px" borderRadius="md" p="4" bg="white" boxShadow="md" width="200px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold">친구 리스트</Text>
        <IconButton
          icon={isMinimized ? <ChatIcon /> : <MinusIcon />}
          size="sm"
          onClick={toggleMinimize}
          aria-label={isMinimized ? "Expand List" : "Minimize List"}
        />
      </Box>
      {!isMinimized && (
        <VStack align="start" spacing={3} mt="4">
          {friends.map((friend, index) => (
            <HStack key={index} spacing={3} width="100%" justifyContent="space-between">
              <HStack spacing={2}>
                <Box as="span" borderRadius="full" bg={friend.online ? "green.400" : "gray.400"} boxSize="10px" />
                <Text>{friend.name}</Text>
              </HStack>
              <Button size="sm" variant="ghost" onClick={() => onSelectFriend(friend.name)}> <ChatIcon/></Button>
            </HStack>
          ))}
        </VStack>
      )}
    </Box>
  );
};
