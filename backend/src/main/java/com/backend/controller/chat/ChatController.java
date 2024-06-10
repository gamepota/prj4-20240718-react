package com.backend.controller.chat;

import com.backend.domain.chat.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
	// 클라이언트로부터 /app/chat 경로로 메시지 수신 시 처리
	@MessageMapping("/chat")
	@SendTo("/topic/messages") // 메시지를 /topic/public 경로로 전송
	public ChatMessage processMessage (@Payload ChatMessage message) {
		return message;
	}
}
