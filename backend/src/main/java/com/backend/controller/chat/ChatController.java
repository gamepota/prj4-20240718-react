package com.backend.controller.chat;

import com.backend.domain.chat.ChatMessage;
import com.backend.service.chat.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {
	private final MessageService service;

	@MessageMapping("/chat/{senderId}/{recipientId}")
	@SendTo("/topic/public") // 모든 클라이언트가 구독하는 공통 채널
	public ChatMessage processMessage(@Payload ChatMessage message) {
		return message;
	}

	@PostMapping("/chat")
	public void saveMessage(@RequestBody ChatMessage message) {
		service.saveMessage(message);
	}

}
