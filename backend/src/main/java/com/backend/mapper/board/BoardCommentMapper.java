package com.backend.mapper.board;

import com.backend.domain.board.BoardComment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardCommentMapper {

    @Insert("""
                        INSERT INTO board_comment
            (board_id, board_comment) 
            VALUES (#{boardId}, #{boardComment})
                        """)
    int insert(BoardComment comment);
}
