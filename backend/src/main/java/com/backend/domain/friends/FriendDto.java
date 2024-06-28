package com.backend.domain.friends;

public class FriendDto {
	private Integer id;
	private String nickname;
	private Boolean online;

	// Constructors, getters, and setters

	public FriendDto(Integer id, String nickname, Boolean online) {
		this.id = id;
		this.nickname = nickname;
		this.online = online;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public Boolean getOnline() {
		return online;
	}

	public void setOnline(Boolean online) {
		this.online = online;
	}
}
