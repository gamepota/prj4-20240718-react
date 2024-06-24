package com.backend.domain.chat;

import lombok.Data;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.time.LocalDateTime;

@Data
public class ChatMessage {
	private Long id; // 자동 증가 ID 필드
	private Integer senderId;
	private Integer recipientId;
	private String content;
	private LocalDateTime timestamp;
	private String senderName;
	private String recipientName;
}
