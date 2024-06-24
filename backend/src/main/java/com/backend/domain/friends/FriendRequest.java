package com.backend.domain.friends;

import lombok.Data;

@Data
public class FriendRequest {
	private String memberNickname;
	private String friendNickname;
}