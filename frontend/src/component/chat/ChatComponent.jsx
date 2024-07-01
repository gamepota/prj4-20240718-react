import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  CloseButton,
  HStack,
  Flex
} from "@chakra-ui/react";
import { MinusIcon, ChatIcon } from "@chakra-ui/icons";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { LoginContext } from '../LoginProvider';

export const ChatComponent = ({ selectedFriend, onClose, onNewMessage }) => {
  const { memberInfo } = useContext(LoginContext) || {};
  const username = memberInfo?.nickname;
  const userId = memberInfo?.id;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const prevOnNewMessageRef = useRef();

  useEffect(() => {
    if (prevOnNewMessageRef.current !== onNewMessage) {
      console.log("onNewMessage updated:", onNewMessage);
      prevOnNewMessageRef.current = onNewMessage;
    }
  }, [onNewMessage]);

  useEffect(() => {
    console.log("ChatComponent mounted. selectedFriend:", selectedFriend);

    if (username && selectedFriend) {
      const roomId = [userId, selectedFriend.id].sort((a, b) => a - b).join('-');
      const socket = new SockJS(`/ws`);
      const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
          client.subscribe(`/topic/chatroom/${roomId}`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            console.log("Received message:", receivedMessage);
            if (onNewMessage && typeof onNewMessage === 'function') {
              console.log("Calling onNewMessage with senderId:", receivedMessage.senderId);
              onNewMessage(receivedMessage.senderId);
            } else {
              console.log("onNewMessage is not available or not a function:", onNewMessage);
            }
          });
          setIsConnected(true);
          setStompClient(client);
          fetchMessagesForRoom(roomId);
        },
        onStompError: (frame) => {
          console.error("Broker error: ", frame.headers["message"], frame.body);
          setIsConnected(false);
        },
        onWebSocketError: (error) => {
          console.error("WebSocket error: ", error);
          setIsConnected(false);
        },
        onDisconnect: () => {
          setIsConnected(false);
        }
      });
      client.activate();

      return () => {
        if (client) {
          client.deactivate();
        }
      };
    }
  }, [username, selectedFriend, onNewMessage, userId]);

  const fetchMessagesForRoom = async (roomId) => {
    try {
      const response = await axios.get(`/api/chat/messages/${roomId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const sendMessage = async () => {
    if (!isConnected) {
      return;
    }

    if (!message.trim() || !selectedFriend) {
      return;
    }

    const roomId = [userId, selectedFriend.id].sort((a, b) => a - b).join('-');
    const chatMessage = {
      senderId: userId,
      recipientId: selectedFriend.id,
      content: message,
      senderNickName: username,
      recipientNickName: selectedFriend.nickname
    };

    stompClient.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(chatMessage)
    });

    try {
      await axios.post('/api/chat', chatMessage);
    } catch (error) {
      console.error("Error saving message to the server:", error);
    }

    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Box position="fixed" bottom={2} right={2} p={2} minW="400px" maxW="400px" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white">
      <Box display="flex" justifyContent="space-between" alignItems="center" borderBottomWidth="1px" p={2}>
        <HStack>
          <Text fontWeight="bold">채팅</Text>
          <Text color={"gray.400"}> with {selectedFriend.nickname}</Text>
        </HStack>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <IconButton
            icon={isMinimized ? <ChatIcon /> : <MinusIcon />}
            size="sm"
            onClick={toggleMinimize}
            aria-label={isMinimized ? "Expand Chat" : "Minimize Chat"}
          />
          <CloseButton onClick={onClose} />
        </Box>
      </Box>
      {!isMinimized && (
        <VStack spacing={4} p={2}>
          <Box width="100%" h="300px" overflowY="scroll" p={2} borderWidth="1px" borderRadius="lg">
            {messages.map((msg, index) => (
              <Flex key={index} justifyContent={Number(msg.senderId) === Number(userId) ? "flex-start" : "flex-end"} mb={2}>
                <Box
                  bg={Number(msg.senderId) === Number(userId) ? "blue.100" : "gray.100"}
                  p={2}
                  borderRadius="md"
                  textAlign={Number(msg.senderId) === Number(userId) ? "left" : "right"}
                  maxWidth="70%"
                >
                  <Text fontSize="md" fontWeight="bold">{msg.senderNickName}</Text>
                  <Text fontSize="md">{msg.content}</Text>
                  <Text fontSize="md" color="gray.500">
                    {new Date(msg.timestamp).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
                  </Text>
                </Box>
              </Flex>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          <InputGroup>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={sendMessage} disabled={!isConnected}>
                보냄
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
      )}
    </Box>
  );
};
