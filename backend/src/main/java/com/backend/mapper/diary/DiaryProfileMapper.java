package com.backend.mapper.diary;

import com.backend.domain.diary.DiaryProfile;
import org.apache.ibatis.annotations.*;

@Mapper
public interface DiaryProfileMapper {

	@Select("""
    SELECT status_message, introduction
    FROM diary_profile
    WHERE member_id = #{memberId}
    """)
	DiaryProfile getProfile(@Param("memberId") Integer memberId);

	@Update("""
    UPDATE diary_profile 
    SET status_message = #{statusMessage}, introduction = #{introduction}
    WHERE member_id = #{memberId}
    """)
	void updateProfile(@Param("memberId") Integer memberId, @Param("statusMessage") String statusMessage, @Param("introduction") String introduction);

	@Insert("""
    INSERT INTO diary_profile (member_id, status_message, introduction)
    VALUES (#{memberId}, #{statusMessage}, #{introduction})
    """)
	void insertProfile(@Param("memberId") Integer memberId, @Param("statusMessage") String statusMessage, @Param("introduction") String introduction);
}