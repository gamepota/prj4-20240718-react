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
  CloseButton
} from "@chakra-ui/react";
import { MinusIcon, ChatIcon } from "@chakra-ui/icons";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { LoginContext } from '../../component/LoginProvider'; // LoginContext 가져오기

export const ChatComponent = ({ selectedFriend, onClose }) => {
  const { nickname: username } = useContext(LoginContext) || {}; // 내 nickname 가져오기
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // 최소화 상태 관리
  const messagesEndRef = useRef(null); // 메시지 스크롤 관리

  useEffect(() => {
    if (username && selectedFriend) {
      const roomId = [username, selectedFriend.nickname].sort().join('-'); // 고유한 채팅방 ID 생성
      console.log(roomId);
      const socket = new SockJS(`http://localhost:8080/ws`); // SockJS 서버 URL
      const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
          console.log("Connected to WebSocket");
          client.subscribe(`/topic/chatroom/${roomId}`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log("Received message:", receivedMessage);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          });
          setIsConnected(true);
          setStompClient(client);
          console.log("STOMP Client Connected");
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
          console.log("Disconnected from WebSocket");
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
  }, [username, selectedFriend]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const sendMessage = async () => {
    if (!isConnected) {
      console.error("Cannot send message: WebSocket is not connected.");
      return;
    }

    if (!message.trim() || !selectedFriend) {
      console.error("Cannot send message: message or selectedFriend is empty.");
      return;
    }

    const roomId = [username, selectedFriend.nickname].sort().join('-'); // 고유한 채팅방 ID 생성
    const chatMessage = {
      senderNickname: username,
      recipientNickname: selectedFriend.nickname,
      content: message,
      timestamp: new Date.toLocaleString()
    };
    console.log("Sending message:", chatMessage);

    // WebSocket을 통해 메시지 전송
    stompClient.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(chatMessage)
    });

    // HTTP POST 요청을 통해 메시지 저장
    try {
      await axios.post('http://localhost:8080/chat', chatMessage);
      console.log("Message saved to the server");
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
        <Text fontWeight="bold">채팅</Text>
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
              <Box key={index} bg={msg.senderNickname === username ? "blue.100" : "gray.100"} p={2} borderRadius="md" mb={2}>
                <Text fontWeight="bold">{msg.senderNickname}</Text>
                <Text>{msg.content}</Text>
                <Text fontSize="xs" color="gray.500">{new Date(msg.timestamp).toLocaleTimeString()}</Text>
              </Box>
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
