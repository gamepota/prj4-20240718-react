package com.backend.mapper.board;

import com.backend.domain.board.Board;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BoardMapper {


    @Insert("""
            INSERT INTO board(title,content,writer)
            VALUES (#{title},#{content},#{writer})
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
            Select * 
            from board
            WHERE id = #{id}
                        """)
    Board selectById(Integer id);

    @Delete("""
            DELETE FROM board
            WHERE id = #{id}
            """)
    int deleteById(Integer id);

    @Update("""
                    UPDATE board
                    SET title=#{title},content=#{content},writer=#{writer}
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
            SELECT id,title,writer,board_type FROM board 
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
