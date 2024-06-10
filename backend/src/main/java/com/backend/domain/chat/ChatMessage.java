package com.backend.domain;

import lombok.Data;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.time.LocalDateTime;

@Data
public class ChatMessage {
	private Long id; // 자동 증가 ID 필드
	private String sender;
	private String recipient;
	private String content;
	private LocalDateTime timestamp;
}
