package com.backend.mapper.diary;

import com.backend.domain.diary.DiaryComment;
import org.apache.ibatis.annotations.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@Mapper
public interface DiaryCommentMapper {

    @Insert("""
            INSERT INTO diaryComment
            (board_id,member_id,comment)
            VALUES (#{boardId},#{memberId},#{comment})
            """)
    int diaryCommentInsert(DiaryComment diaryComment, Authentication authentication);

    @Select("""
            SELECT c.id,
                   c.comment,
                   c.inserted,
                   c.member_id,
                   m.nick_name 
            FROM DiaryComment c JOIN member m ON c.member_id=m.id
            WHERE board_id=#{boardId}
            ORDER BY id
            """)
    List<DiaryComment> selectAllByBoardId(Integer boardId);


    @Delete("""
            DELETE FROM diaryComment
            WHERE id = #{id}
            """)
    int deleteById(Integer id);


    @Select("""
                SELECT *
                FROM diaryComment
                WHERE id = #{id}
            """)
    DiaryComment selectById(Integer id);

    @Update("""
                UPDATE diaryComment
                SET comment = #{comment}
                WHERE id = #{id}
            """)
    int diaryUpdate(DiaryComment diaryComment);
}
