package com.backend.mapper.board;

import com.backend.domain.board.BoardComment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardCommentMapper {

    @Insert("""
                        INSERT INTO board_comment
            (board_id, member_id, comment) 
            VALUES (#{boardId}, #{memberId}, #{comment})
                        """)
    int insert(BoardComment comment);
}
