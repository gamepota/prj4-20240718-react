package com.backend.service.diary;

import com.backend.domain.diary.DiaryProfile;
import com.backend.mapper.diary.DiaryProfileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DiaryProfileService {

	private final DiaryProfileMapper diaryProfileMapper;

	public void updateProfile(Integer memberId, String statusMessage, String introduction) {
		diaryProfileMapper.updateProfile(memberId, statusMessage, introduction);
	}

	public void createProfile(Integer memberId, String statusMessage, String introduction) {
		diaryProfileMapper.insertProfile(memberId, statusMessage, introduction);
	}

	public DiaryProfile getProfileByMemberId(Integer memberId) {
		return diaryProfileMapper.getProfile(memberId);
	}

	public boolean profileExists(Integer memberId) {
		return diaryProfileMapper.getProfile(memberId) != null;
	}
}
