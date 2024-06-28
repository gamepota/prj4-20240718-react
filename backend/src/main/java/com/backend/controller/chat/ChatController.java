package com.backend.controller.chat;

import com.backend.domain.chat.ChatMessage;
import com.backend.service.chat.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class ChatController {
	private final MessageService service;
	private final SimpMessageSendingOperations messagingTemplate;

	@MessageMapping("/chat/{roomId}")
	public void processMessage(@Payload ChatMessage message, @DestinationVariable String roomId) {
		message.setTimestamp(LocalDateTime.now()); // 현재 시간 설정
		messagingTemplate.convertAndSend("/topic/chatroom/" + roomId, message);
	}

	@PostMapping("/chat")
	@ResponseBody
	public void saveMessage(@RequestBody ChatMessage message) {
		System.out.println("Received message: " + message);
		service.saveMessage(message);
	}

	@GetMapping("/chat/messages/{roomId}")
	@ResponseBody
	public List<ChatMessage> getMessagesForRoom(@PathVariable String roomId) {
		// roomId를 senderId와 recipientId로 분리
		String[] ids = roomId.split("-");
		Integer id1 = Integer.parseInt(ids[0]);
		Integer id2 = Integer.parseInt(ids[1]);
		return service.getMessagesForRoom(id1, id2);
	}
}
