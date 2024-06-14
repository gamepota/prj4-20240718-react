package com.backend.mapper.diary;


import com.backend.domain.diary.DiaryBoard;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DiaryBoardMapper {

    @Insert("""
                INSERT INTO test(content,writer,title)
                VALUES (#{content}, #{writer},#{title})
            """)
    int insert(DiaryBoard diaryBoard);


    @Select("""
                SELECT 
                id,
                title,
                writer
                FROM test
                ORDER BY id DESC
            """)
    List<DiaryBoard> selectAll();


    @Select("""
                SELECT id,
                       content,
                       inserted,
                       writer,
                FROM test
                WHERE id = #{id}
            """)
    DiaryBoard selectById(Integer id);


    @Delete("""
            DELETE FROM test
            WHERE id = #{id}
            """)
    int deleteById(Integer id);


    @Update("""
                UPDATE test
                SET content=#{content},
                    writer=#{writer}
                WHERE id=#{id}
            """)
    int update(DiaryBoard diaryBoard);
}
