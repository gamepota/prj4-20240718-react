package com.backend.domain.logIn;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class LogInInfo {
	private  String memberNickname;
	private  boolean loggedIn;
	private  Timestamp loggedInAt;
}
