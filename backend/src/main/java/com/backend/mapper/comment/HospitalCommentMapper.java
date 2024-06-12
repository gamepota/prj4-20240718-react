package com.backend.mapper.comment;

import com.backend.domain.comment.HospitalComment;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

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
            SELECT *
            FROM hospital_comment
            WHERE  hospital_id = #{hospitalId}
            ORDER BY id
            """)
    List<HospitalComment> selectByHospitalId(Integer hospitalId);

    @Delete("""
            DELETE FROM hospital_comment
            WHERE id = #{id}
            """)
    int deletById(Integer id);

    @Select("""
            SELECT *
            FROM hospital_comment
            WHERE id = #{id}
            """)
    HospitalComment selectById(Integer id);
}
