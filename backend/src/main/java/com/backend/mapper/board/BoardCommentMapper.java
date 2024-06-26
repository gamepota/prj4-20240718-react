package com.backend.mapper.board;

import com.backend.domain.board.BoardComment;
import org.apache.ibatis.annotations.*;

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

    @Update("""
            UPDATE  board_comment
            SET board_comment=#{boardComment}
            WHERE id=#{id}
            """)
    int update(BoardComment boardComment);

    @Delete("""
            DELETE FROM board_comment
            WHERE member_id=#{memberId}
            """)
    int deleteByMemberId(Integer memberId);
}
