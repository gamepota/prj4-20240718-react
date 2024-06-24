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

@Controller
@RequiredArgsConstructor
public class ChatController {
	private final MessageService service;

	@MessageMapping("/chat/{roomId}")
	@SendTo("/topic/chatroom/{roomId}")
	public ChatMessage processMessage(@Payload ChatMessage message) {
		// 메시지를 그대로 반환하여 브로커를 통해 클라이언트에게 전달
		return message;
	}

	@PostMapping("/chat")
	public void saveMessage(@RequestBody ChatMessage message) {
		service.saveMessage(message);
	}
}
