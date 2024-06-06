package com.backend.diary.mapper;


import com.backend.diary.domain.DiaryBoard;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DiaryBoardMapper {

    @Insert("""
                INSERT INTO DiaryBoard(title, content, writer)
                VALUES (#{title}, #{content}, #{writer}
            """)
    public int insert(DiaryBoard diaryBoard);


    @Select("""
                SELECT id,title,writer
                FROM DiaryBoard
                ORDER BY id DESC
            """)
    List<DiaryBoard> selectAll();
}
