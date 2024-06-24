package com.backend.mapper.board;

import com.backend.domain.board.Board;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BoardMapper {


    @Insert("""
            INSERT INTO board(title,content,member_id)
            VALUES (#{title},#{content},#{memberId})
                        """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Board board);

    @Select("""
            SELECT * FROM board 
            ORDER BY id DESC
            LIMIT #{offset},#{pageAmount}
            """)
    List<Board> selectAll(Integer offset, Integer pageAmount);

    @Select("""
            Select b.id ,
            b.title,
            b.content,
            b.inserted,
            m.nickname writer,
            b.member_id
                        from board b JOIN member m ON b.member_id = m.id
                        WHERE b.id = #{id};

                                    """)
    Board selectById(Integer id);

    @Delete("""
            DELETE FROM board
            WHERE id = #{id}
            """)
    int deleteById(Integer id);

    @Update("""
                    UPDATE board
                    SET title=#{title},content=#{content}
                    WHERE id=#{id}
            """)
    int update(Board board);

    @Select("""
            SELECT COUNT(*) FROM board;

                        """)
    int selectAllCount();

    @Select("""
                SELECT COUNT(*) FROM board
                WHERE board_type=#{boardType};

            """)
    Integer selectByBoardType(String boardType);

    @Select("""
            <script>
            SELECT b.id,b.title,m.nickname writer,b.board_type,b.views FROM board b JOIN member m ON b.member_id = m.id
                <if test="boardType !='전체'">
            WHERE board_type = #{boardType}
                 </if>
            ORDER BY id DESC
            LIMIT #{offset},#{pageAmount}
            </script>
            """)
    List<Board> selectAllPaging(Integer offset, Integer pageAmount, String boardType);


    @Insert("""
            INSERT INTO board_file(board_id,name)
            VALUES (#{boardId},#{name})
            """)
    int insertFileName(Integer boardId, String name);

    @Select("""
            SELECT name
            FROM board_file
            WHERE board_id=#{boardId}
            """)
    List<String> selectFileNameByBoardId(Integer boardId);

    @Delete("""
            DELETE FROM board_file
            WHERE board_id=#{boardId}
            """)
    int deleteFileByBoardId(Integer boardId);

    @Delete("""
            DELETE FROM board_file
            WHERE board_id=#{boardId}
            AND name=#{fileName}
            """)
    int deleteFileByBoardIdAndName(Integer boardId, String fileName);


}
