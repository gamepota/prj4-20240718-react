import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  CloseButton
} from "@chakra-ui/react";
import { MinusIcon, ChatIcon } from "@chakra-ui/icons";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios"; // Axios를 사용하여 HTTP 요청을 보냄

export const ChatComponent = ({ onClose }) => {
  const [senderId, setSenderId] = useState(""); // 발신자 ID
  const [recipientId, setRecipientId] = useState(""); // 수신자 ID
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // 최소화 상태 관리
  const messagesEndRef = useRef(null); // 메시지 스크롤 관리

  useEffect(() => {
    if (senderId && recipientId) {
      const socket = new SockJS(`http://localhost:8080/ws/${senderId}/${recipientId}`); // SockJS 서버 URL
      const client = new Client({ // STOMP 클라이언트 생성
        webSocketFactory: () => socket, // WebSocket 팩토리 설정
        reconnectDelay: 5000, // 재연결 지연 시간 설정
        onConnect: () => { // 연결 이벤트 핸들러
          console.log("Connected to WebSocket");
          client.subscribe(`/topic/${senderId}/${recipientId}`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log("Received message:", receivedMessage);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          });
          setIsConnected(true);
          setStompClient(client); // stompClient 상태 설정
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
      setStompClient(client);

      return () => {
        if (client) {
          client.deactivate();
        }
      };
    }
  }, [senderId, recipientId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const sendMessage = async () => {
    if (isConnected && message && recipientId) {
      const chatMessage = {
        senderId: senderId,
        recipientId: recipientId,
        content: message,
        timestamp: new Date().toISOString()
      };
      console.log("Sending message:", chatMessage);

      // WebSocket을 통해 메시지 전송
      stompClient.publish({
        destination: `/app/chat/${senderId}/${recipientId}`,
        body: JSON.stringify(chatMessage) });
      // HTTP POST 요청을 통해 메시지 저장
      try {
        await axios.post('http://localhost:8080/chat', chatMessage);
        console.log("Message saved to the server");
      } catch (error) {
        console.error("Error saving message to the server yeah:", error);
      }

      setMessage('');
    } else {
      console.error("Cannot send message: WebSocket is not connected, message or recipientId is empty.");
    }
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
          <HStack width="100%">
            <Input
              type="text"
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              placeholder="발신자 ID를 입력하세요"
            />
            <Input
              type="text"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              placeholder="수신자 ID를 입력하세요"
            />
          </HStack>
          <Box width="100%" h="300px" overflowY="scroll" p={2} borderWidth="1px" borderRadius="lg">
            {messages.map((msg, index) => (
              <Box key={index} bg={msg.senderId === senderId ? "blue.100" : "gray.100"} p={2} borderRadius="md" mb={2}>
                <Text fontWeight="bold">{msg.senderId}</Text>
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
