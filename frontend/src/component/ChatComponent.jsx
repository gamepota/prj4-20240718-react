import { Box, Input, Button, VStack, HStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function ChatComponent() {
  const [name, setName] = useState(""); // 사용자 이름
  const [recipient, setRecipient] = useState(""); // 수신자 이름
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        client.subscribe('/user/queue/messages', (message) => {
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

  const sendMessage = () => {
    if (isConnected && message && recipient) {
      const chatMessage = {
        sender: name,
        recipient: recipient,
        content: message,
        timestamp: new Date()
      };
      console.log("Sending message:", chatMessage);
      stompClient.publish({ destination: '/app/chat', body: JSON.stringify(chatMessage) });
      setMessage('');
    } else {
      console.error("Cannot send message: WebSocket is not connected or recipient/message is empty.");
    }
  };

  return (
    <Box p={5} maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <VStack spacing={4}>
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
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <Button onClick={sendMessage} disabled={!isConnected}>Send</Button>
        <Box width="100%" maxH="300px" overflowY="scroll" p={2} borderWidth="1px" borderRadius="lg">
          {messages.map((msg, index) => (
            <Box key={index} bg={msg.sender === name ? "blue.100" : "gray.100"} p={2} borderRadius="md" mb={2}>
              <Text fontWeight="bold">{msg.sender}</Text>
              <Text>{msg.content}</Text>
              <Text fontSize="xs" color="gray.500">{new Date(msg.timestamp).toLocaleTimeString()}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
}
