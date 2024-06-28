package com.backend.mapper.board;

import com.backend.domain.board.Board;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BoardMapper {


    @Insert("""
            INSERT INTO board(title,content,member_id,views,board_type)
            VALUES (#{title},#{content},#{memberId},0,#{boardType})
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
            b.member_id,
            b.views
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
                 SELECT b.id,b.title,m.nickname writer,b.board_type,b.views,b.member_id,
            COUNT(DISTINCT f.name)number_of_images,
            COUNT(DISTINCT  l.member_id)number_of_likes,
            COUNT(DISTINCT  c.id)number_of_comments
                 FROM board b JOIN member m ON b.member_id = m.id
                                            LEFT JOIN board_file f ON b.id=f.board_id
                                            LEFT JOIN board_like l ON b.id=l.board_id
                                            LEFT JOIN board_comment c ON b.id=c.board_id
                     <if test="boardType !='전체'">
                 WHERE board_type = #{boardType}
                      </if>
                GROUP BY b.id
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


    @Select("""
            SELECT views FROM board
            WHERE id=#{id}

                        """)
    int selectCountById(Integer id);

    @Update("""
                        UPDATE board
            SET views=#{views}+1
            WHERE id=#{id}
            """)
    int incrementViewsById(Integer id, Integer views);


    @Delete("""
            DELETE FROM board_like
            WHERE board_id=#{boardId}
            AND member_id=#{memberId}
            """)
    int deleteLikeByBoardIdAndMemberId(Integer boardId, Integer memberId);

    @Insert("""
            INSERT INTO board_like (board_id, member_id)
            VALUES (#{boardId}, #{memberId})
            """)
    void insertLikeByBoardIdAndMemberId(Integer boardId, Integer memberId);

    @Select("""
            SELECT COUNT(*)
            FROM board_like
            WHERE board_id=#{boardId}
            """)
    int selectCountLikeByBoardId(Integer boardId);

    @Select("""
            SELECT COUNT(*)FROM board_like
            WHERE board_id=#{id}
            AND member_id=#{memberId}
            """)
    int selectLikeByBoardIdAndMemberId(Integer id, Integer memberId);

    @Select("""
                        SELECT id
                        FROM board
                        WHERE member_id=#{id}
            """)
    List<Board> selectByMemberId(Integer id);

    @Delete("""
            DELETE FROM board_like
            WHERE member_id=#{memberId}
            """)
    int deleteLikeByMemberId(Integer memberId);

    @Delete("""
                        DELETE FROM board_like
                        WHERE member_id=#{id};

            """)
    int deleteLikeByBoardId(Integer id);


}
