package com.backend.domain.diary;

import lombok.Data;

@Data
public class DiaryProfile {
	private Integer memberId;
	private String statusMessage;
	private String introduction;

	// 기본 생성자 추가
	public DiaryProfile() {
		this.statusMessage = "";
		this.introduction = "";
	}
}
