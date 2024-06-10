package com.backend.service.chat;

import com.backend.domain.ChatMessage;
import com.backend.mapper.MessageMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
	private final MessageMapper messageMapper;

	public MessageService(MessageMapper messageMapper) {
		this.messageMapper = messageMapper; // 메시지 매퍼 초기화
	}

	public void saveMessage(ChatMessage message) {
		messageMapper.insertMessage(message); // 메시지 저장
	}

	public List<ChatMessage> getMessagesForUser(String recipient) {
		return messageMapper.findMessagesByRecipient(recipient); // 수신자에 대한 메시지 반환
	}
}