package com.backend.mapper.board;

import com.backend.domain.board.BoardComment;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BoardCommentMapper {

    @Insert("""
                        INSERT INTO board_comment
            (board_id, board_comment) 
            VALUES (#{boardId}, #{boardComment})
                        """)
    int insert(BoardComment comment);

    @Select("""
                        SELECT id, board_comment,inserted
            FROM board_comment
                                    WHERE board_id=#{boardId}
                        ORDER BY id;


                        """)
    List<BoardComment> selectAllByBoardId(Integer boardId);

    @Delete("""
            DELETE FROM board_comment
            WHERE id=#{id}
            """)
    int deleteById(Integer id);
}
