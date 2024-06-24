package com.backend.controller.chat;

import com.backend.domain.chat.ChatMessage;
import com.backend.service.chat.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;

@Controller
@RequestMapping("/api") // 추가
@RequiredArgsConstructor
public class ChatController {
	private final MessageService service;
	private final SimpMessageSendingOperations messagingTemplate;

	@MessageMapping("/chat/{roomId}")
	public void processMessage(@Payload ChatMessage message, @DestinationVariable String roomId) {
		// 메시지를 클라이언트에게 전송
		message.setTimestamp(LocalDateTime.now()); // 현재 시간 설정
		messagingTemplate.convertAndSend("/topic/chatroom/" + roomId, message);
	}

	@PostMapping("/chat")
	@ResponseBody
	public void saveMessage(@RequestBody ChatMessage message) {
		System.out.println("Received message: " + message);
		service.saveMessage(message);
	}
}
