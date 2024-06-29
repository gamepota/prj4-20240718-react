package com.backend.mapper.member;

import com.backend.domain.member.Profile;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface ProfileMapper {
    @Insert("""
            INSERT INTO profile (member_id, file_name, upload_path) 
            VALUES (#{memberId}, #{fileName}, #{uploadPath})
            """)
    int insertProfile(Profile profile);

    @Select("""
            SELECT * 
            FROM profile 
            WHERE member_id = #{memberId}
            """)
    Profile selectProfileByMemberId(int memberId);

    @Delete("""
            DELETE FROM profile 
            WHERE member_id = #{memberId}
            """)
    int deleteProfileByMemberId(int memberId);
}
