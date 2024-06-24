package com.backend.controller.chat;

import com.backend.domain.chat.ChatMessage;
import com.backend.service.chat.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequiredArgsConstructor
public class ChatController {
	private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
	private final MessageService service;
	private final SimpMessagingTemplate messagingTemplate;

	@MessageMapping("/chat/{roomId}")
	public void processMessage(@Payload ChatMessage message, @DestinationVariable String roomId) {
		messagingTemplate.convertAndSend("/topic/chatroom/" + roomId, message);
	}

	@PostMapping("/api/chat")
	public void saveMessage(@RequestBody ChatMessage message) {
		logger.info("Saving message: {}", message); // 메시지 내용을 로그로 출력
		service.saveMessage(message);
	}
}
