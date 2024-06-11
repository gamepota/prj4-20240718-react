package com.backend.mapper.diary;


import com.backend.domain.diary.DiaryBoard;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DiaryBoardMapper {

    @Insert("""
                INSERT INTO diary(content, writer,member_id)
                VALUES (#{content}, #{writer},#{memberId})
            """)
    public int insert(DiaryBoard diaryBoard);


    @Select("""
                SELECT 
                d.id,
                d.title,
                m.nick_name.writer
                FROM diary d JOIN member m ON d.member_id = m.id
                ORDER BY d.id DESC
            """)
    List<DiaryBoard> selectAll();


    @Select("""
                SELECT d.id,
                       d.content,
                       d.inserted,
                       m.nick_name.writer
                FROM diary d JOIN member m on d.member_id = m.id
                WHERE d.id = #{id}
            """)
    DiaryBoard selectById(Integer id);


    @Delete("""
            DELETE FROM diary
            WHERE id = #{id}
            """)
    int deleteById(Integer id);


    @Update("""
                UPDATE diary
                SET content=#{content},
                    writer=#{writer}
                WHERE d.id=#{id}
            """)
    int update(DiaryBoard diaryBoard);
}
