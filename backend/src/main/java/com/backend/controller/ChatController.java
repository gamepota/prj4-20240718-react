package com.backend.controller;

import com.backend.domain.ChatMessage;
import com.backend.service.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

	private final SimpMessageSendingOperations messagingTemplate;
	private final MessageService messageService;

	public ChatController(SimpMessageSendingOperations messagingTemplate, MessageService messageService) {
		this.messagingTemplate = messagingTemplate;
		this.messageService = messageService;
	}

	@MessageMapping("/chat")
	public void processMessageFromClient(@Payload ChatMessage chatMessage) {
		messageService.saveMessage(chatMessage);
		messagingTemplate.convertAndSendToUser(chatMessage.getRecipient(), "/queue/messages", chatMessage);
	}
}
