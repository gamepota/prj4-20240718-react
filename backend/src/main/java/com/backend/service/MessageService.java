package com.backend.service;

import com.backend.domain.ChatMessage;
import com.backend.mapper.MessageMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
	private final MessageMapper messageMapper;

	public MessageService(MessageMapper messageMapper) {
		this.messageMapper = messageMapper;
	}

	public void saveMessage(ChatMessage message) {
		messageMapper.insertMessage(message);
	}

	public List<ChatMessage> getMessagesForUser(String recipient) {
		return messageMapper.findMessagesByRecipient(recipient);
	}
}