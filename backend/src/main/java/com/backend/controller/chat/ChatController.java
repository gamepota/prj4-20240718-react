package com.backend.controller;

import com.backend.domain.ChatMessage;
import com.backend.service.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate; // 메시지 템플릿
    private final MessageService messageService;

    // 생성자 주입을 통해 메시지 템플릿과 메시지 서비스 초기화
    public ChatController(SimpMessageSendingOperations messagingTemplate, MessageService messageService) {
        this.messagingTemplate = messagingTemplate; // 메시지 템플릿 초기화
        this.messageService = messageService; // 메시지 서비스 초기화
    }

    // 클라이언트로부터 /app/chat 경로로 메시지 수신 시 처리
    @MessageMapping("/chat")
    public void processMessageFromClient(@Payload ChatMessage chatMessage) { // 메시지 페이로드 수신
        messageService.saveMessage(chatMessage); // 메시지 저장
        System.out.println("chatMessage.getSender() = " + chatMessage.getSender());
        System.out.println("Sending message to user: " + chatMessage.getRecipient());
        System.out.println("chatMessage = " + chatMessage.getContent());
        // 전송 경로가 클라이언트 구독 경로와 일치하는지 확인합니다.
        messagingTemplate.convertAndSendToUser(chatMessage.getRecipient(), "/queue/messages", chatMessage);
    }
}
