import React, { useContext, useEffect, useState } from "react";
import Draggable from "react-draggable";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChatIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../LoginProvider.jsx";
import { generateDiaryId } from "../../util/util";

export const FriendsListComponent = ({ onSelectFriend, newMessages = {} }) => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(true);

  const { memberInfo } = useContext(LoginContext);
  const memberId = memberInfo ? memberInfo.id : null;

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const fetchFriends = async () => {
    if (memberId) {
      try {
        const response = await axios.get(`/api/friends/${memberId}`);
        const friendsData = response.data;

        const friendsWithImages = await Promise.all(
          friendsData.map(async (friend) => {
            try {
              const profileResponse = await axios.get(
                `/api/member/${friend.id}`,
              );
              return {
                ...friend,
                profileImage: profileResponse.data.imageUrl,
              };
            } catch (error) {
              console.error("Error fetching profile image:", error);
              return {
                ...friend,
                profileImage: null,
              };
            }
          }),
        );

        setFriends(friendsWithImages);
      } catch (error) {
        console.error("There was an error fetching the friends!", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
    }
  };

  const deleteFriend = (friendId) => {
    if (memberId) {
      axios
        .delete(`/api/friends/delete`, { params: { memberId, friendId } })
        .then((response) => {
          fetchFriends();
        })
        .catch((error) => {
          console.error("There was an error deleting the friend!", error);
        });
    }
  };

  useEffect(() => {
    fetchFriends();

    const intervalId = setInterval(() => {
      fetchFriends();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [memberId]);

  return (
    <VStack>
      <Draggable>
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
            <Text fontSize="xl" fontWeight="bold">
              친구 리스트
            </Text>
            <IconButton
              icon={
                isMinimized ? <FontAwesomeIcon icon={faPlus} /> : <MinusIcon />
              }
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
                      <Flex
                        key={index}
                        width="100%"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <HStack spacing={2}>
                          <Box position="relative">
                            {friend.profileImage ? (
                              <Image
                                borderRadius="full"
                                boxSize="35px"
                                src={friend.profileImage}
                                alt={`${friend.nickname}의 프로필 이미지`}
                              />
                            ) : (
                              <Avatar
                                name={friend.nickname}
                                size="sm"
                                boxSize="35px"
                              />
                            )}
                            <Box
                              position="absolute"
                              top="0"
                              right="0"
                              boxSize="10px"
                              borderRadius="full"
                              bg={friend.online ? "green.400" : "gray.400"}
                              border="2px solid white"
                            />
                          </Box>
                          <Text
                            maxW="100px"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {friend.nickname}
                          </Text>
                          {newMessages[friend.id] && (
                            <Box
                              as="span"
                              borderRadius="full"
                              bg="red.400"
                              boxSize="8px"
                            />
                          )}
                        </HStack>
                        <HStack spacing={1}>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              navigate(`/diary/${generateDiaryId(friend.id)}`)
                            }
                          >
                            <FontAwesomeIcon icon={faHouse} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              onSelectFriend({
                                nickname: friend.nickname,
                                id: friend.id,
                              })
                            }
                          >
                            <ChatIcon />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteFriend(friend.id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </HStack>
                      </Flex>
                    ))
                  )}
                </VStack>
              </Box>
            )
          )}
        </Box>
      </Draggable>
    </VStack>
  );
};
