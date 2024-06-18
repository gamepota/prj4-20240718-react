package com.backend.mapper.comment;

import com.backend.domain.comment.HospitalComment;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface HospitalCommentMapper {
    @Insert("""
            INSERT INTO hospital_comment 
            (hospital_id, member_id, comment)
            VALUES (#{hospitalId}, #{memberId}, #{comment})
            """)
    int insert(HospitalComment hospitalComment);

    @Select("""
            SELECT c.id,c.comment, c.inserted,m.nickname 
            FROM hospital_comment c JOIN member m ON c.member_id = m.id 
            WHERE  hospital_id = #{hospitalId}
            ORDER BY id
            """)
    List<HospitalComment> selectByHospitalId(Integer hospitalId);

    @Delete("""
            DELETE FROM hospital_comment
            WHERE id = #{id}
            """)
    int deleteById(Integer id);

    @Select("""
            SELECT *
            FROM hospital_comment
            WHERE id = #{id}
            """)
    HospitalComment selectById(Integer id);

    @Update("""
            UPDATE hospital_comment
            SET comment= #{comment}
            WHERE id = #{id}
            """)
    int update(HospitalComment hospitalComment);

    @Insert("""
             INSERT INTO hospital_comment
            (username)
             VALUES (#{username})
             """)
    int insertUsername(HospitalComment hospitalComment);

    @Update("""
            UPDATE hospital_comment h
            JOIN  member m ON h.username= m.username
            SET h.member_id = m.id
            WHERE h.member_id IS NULL ;
            """)
    int searchByUserName(HospitalComment hospitalComment);
}
