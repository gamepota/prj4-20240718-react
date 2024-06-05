package com.backend.diary.mapper;


import com.backend.diary.domain.diaryBoard;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface diaryBoardMapper {

    @Insert("""
                INSERT INTO diaryBoard(title, content, writer)
                VALUES (#{title}, #{content}, #{writer}
            """)
    public int insert(diaryBoard diaryBoard);
}
