package com.backend.service.chat;

import com.backend.domain.chat.ChatMessage;
import com.backend.mapper.chat.MessageMapper;
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

    public List<ChatMessage> getMessagesForUser(Integer recipientId) {
        return messageMapper.findMessagesByRecipient(recipientId); // 수신자에 대한 메시지 반환
    }

//	public List<ChatMessage> getMessagesForRoom(String roomId) {
//		return messageMapper.findMessagesByRoomId(roomId); // 채팅방에 대한 메시지 반환
//	}
}
