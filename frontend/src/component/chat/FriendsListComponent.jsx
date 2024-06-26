import React, { useState, useEffect, useContext } from "react";
import { Box, Button, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { ChatIcon, MinusIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { LoginContext } from '../LoginProvider.jsx';

export const FriendsListComponent = ({ onSelectFriend }) => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(true);

  const { memberInfo } = useContext(LoginContext);
  const memberId = memberInfo ? memberInfo.id : null; // ID 사용
  console.log("LoginContext:", memberInfo); // 로그 추가
  console.log("Member ID:", memberId); // 로그 추가

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    if (memberId) {
      console.log(`Fetching friends for member ID: ${memberId}`);
      axios.get(`/api/friends/${memberId}`)
        .then(response => {
          console.log('Fetched friends:', response.data);
          setFriends(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the friends!", error);
        })
        .finally(() => {
          setIsLoading(false); // 로딩 상태를 false로 설정
        });
    } else {
      setIsLoading(true); // memberId가 null일 때 로딩 상태로 설정
    }
  }, [memberId]);

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
            icon={isMinimized ? <PlusSquareIcon /> : <MinusIcon />}
            size="sm"
            onClick={toggleMinimize}
            aria-label={isMinimized ? "Expand List" : "Minimize List"}
          />
        </Box>
        {isLoading ? (
          <Box p={4}>
            <Text>Loading...</Text>
          </Box>
        ) : (
          !isMinimized && (
            <Box mt="4">
              <VStack align="start" spacing={3}>
                {friends.length === 0 ? (
                  <Text>친구가 없습니다.</Text>
                ) : (
                  friends.map((friend, index) => (
                    <HStack key={index} spacing={3} width="100%" justifyContent="space-between">
                      <HStack spacing={2}>
                        <Box as="span" borderRadius="full" bg={friend.online ? "green.400" : "gray.400"} boxSize="10px" />
                        <Text>{friend.nickname}</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate("diary/home")}
                        >
                          <FontAwesomeIcon icon={faHouse} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onSelectFriend({ nickname: friend.nickname, id: friend.id })}
                        >
                          <ChatIcon />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onSelectFriend({ nickname: friend.nickname, id: friend.id })}
                        >
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Button>
                      </HStack>
                    </HStack>
                  ))
                )}
              </VStack>
            </Box>
          )
        )}
      </Box>
    </VStack>
  );
};
