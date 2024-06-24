package com.backend.service.login;

import com.backend.domain.logIn.LogInInfo;
import com.backend.mapper.login.LoggedInMapper;
import org.springframework.stereotype.Service;

@Service
public class LoggedInService {

	private final LoggedInMapper loggedInMapper;

	public LoggedInService(LoggedInMapper loggedInMapper) {
		this.loggedInMapper = loggedInMapper;
	}

	public void updateLoggedInStatus(String memberNickname, boolean loggedIn) {
		LogInInfo existingRecord = loggedInMapper.findByMemberNickname(memberNickname);
		if (existingRecord == null) {
			existingRecord = new LogInInfo();
			existingRecord.setMemberNickname(memberNickname);
		}
		existingRecord.setLoggedIn(loggedIn);
		loggedInMapper.upsertLoggedIn(existingRecord);
	}
}
