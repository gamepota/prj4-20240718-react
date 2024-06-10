import { Box, Input, Button, VStack, HStack, Text, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { MinusIcon, ChatIcon } from "@chakra-ui/icons";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function ChatComponent() {
  const [name, setName] = useState(""); // 사용자 이름
  const [recipient, setRecipient] = useState(""); // 수신자 이름
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // 최소화 상태 관리
  const messagesEndRef = useRef(null); // 메시지 스크롤 관리

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws'); // SockJS 서버 URL
    const client = new Client({ // STOMP 클라이언트 생성
      webSocketFactory: () => socket, // WebSocket 팩토리 설정
      reconnectDelay: 5000, // 재연결 지연 시간 설정
      onConnect: () => { // 연결 이벤트 핸들러
        console.log("Connected to WebSocket");
        client.subscribe('/topic/messages', (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("Received message:", receivedMessage);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
        setIsConnected(true);
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
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const sendMessage = () => {
    if (isConnected && message) {
      const chatMessage = {
        sender: name,
        recipient: recipient,
        content: message,
        timestamp: new Date().toISOString()
      };
      console.log("Sending message:", chatMessage);
      stompClient.publish({ destination: '/app/chat', body: JSON.stringify(chatMessage) });
      setMessage('');
    } else {
      console.error("Cannot send message: WebSocket is not connected or message is empty.");
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
    <Box position="fixed" bottom={2} right={2} p={2} minW="200px" maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white">
      <Box display="flex" justifyContent="space-between" alignItems="center" borderBottomWidth="1px" p={2}>
        <Text fontWeight="bold"> 채팅 </Text>
        <IconButton
          icon={isMinimized ? <ChatIcon /> : <MinusIcon />}
          size="sm"
          onClick={toggleMinimize}
          aria-label={isMinimized ? "Expand Chat" : "Minimize Chat"}
        />
      </Box>
      {!isMinimized && (
        <VStack spacing={4} p={2}>
          <HStack width="100%">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
            />
            <Input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="수신자를 입력하세요"
            />
          </HStack>
          <Box width="100%" h="300px" overflowY="scroll" p={2} borderWidth="1px" borderRadius="lg">
            {messages.map((msg, index) => (
              <Box key={index} bg={msg.sender === name ? "blue.100" : "gray.100"} p={2} borderRadius="md" mb={2}>
                <Text fontWeight="bold">{msg.sender}</Text>
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
              onKeyDown={handleKeyDown} // onKeyDown 이벤트 핸들러 추가
              placeholder="메시지를 입력하세요"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={sendMessage} disabled={!isConnected}>
                보내기
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
      )}
    </Box>
  );
}
