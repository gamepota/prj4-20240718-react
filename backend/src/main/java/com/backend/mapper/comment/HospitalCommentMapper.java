package com.backend.mapper.comment;

import com.backend.domain.comment.HospitalComment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface HospitalCommentMapper {
    @Insert("""
            INSERT INTO hospital_comment
            (hospital_id, member_id, comment)
            VALUES (#{hospitalId}, #{memberId}, #{comment})
            """)
    int insert(HospitalComment hospitalComment);
}
