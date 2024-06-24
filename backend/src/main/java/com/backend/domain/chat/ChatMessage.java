package com.backend.domain.chat;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChatMessage {
	private Integer id; // 자동 증가 ID 필드
	private Integer senderId;
	private Integer recipientId;
	private String content;
	private LocalDateTime timestamp = LocalDateTime.now();
	private String senderNickName;
	private String recipientNickName;
}
