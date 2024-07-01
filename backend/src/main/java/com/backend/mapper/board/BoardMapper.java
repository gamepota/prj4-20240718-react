package com.backend.mapper.board;

import com.backend.domain.board.Board;
import com.backend.domain.board.BoardReport;
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
                <script>
                SELECT COUNT(b.id)
                FROM board b 
                JOIN member m ON b.member_id = m.id
                <where>
                    <if test="boardType != null and boardType != '전체'">
                        b.board_type = #{boardType}
                    </if>
                    <if test="searchType != null and keyword != null and keyword != ''">
                        <bind name="pattern" value="'%' + keyword + '%'" />
                        AND
                        <choose>
                            <when test='searchType == "전체"'>
                                (b.title LIKE #{pattern} OR b.content LIKE #{pattern} OR m.nickname LIKE #{pattern})
                            </when>
                            <when test='searchType == "글"'>
                                (b.title LIKE #{pattern} OR b.content LIKE #{pattern})
                            </when>
                            <when test='searchType == "작성자"'>
                                m.nickname LIKE #{pattern}
                            </when>
                        </choose>
                    </if>
                </where>
                </script>
            """)
    Integer selectByBoardType(@Param("boardType") String boardType, @Param("searchType") String searchType, @Param("keyword") String keyword);

    @Select("""
                <script>
                SELECT b.id,
                       b.title,
                       m.nickname writer,
                       b.board_type,
                       b.views,
                       b.member_id,
                       (SELECT bf.name FROM board_file bf WHERE bf.board_id = b.id LIMIT 1) fileList,
                       COUNT(DISTINCT f.name) number_of_images,
                       COUNT(DISTINCT l.member_id) number_of_likes,
                       COUNT(DISTINCT c.id) number_of_comments
                FROM board b
                JOIN member m ON b.member_id = m.id
                LEFT JOIN board_file f ON b.id = f.board_id
                LEFT JOIN board_like l ON b.id = l.board_id
                LEFT JOIN board_comment c ON b.id = c.board_id
                <where>
                    <if test="boardType != null and boardType != '전체'">
                        b.board_type = #{boardType}
                    </if>
                    <if test="searchType != null and keyword != null and keyword != ''">
                        <bind name="pattern" value="'%' + keyword + '%'" />
                        AND
                        <choose>
                            <when test='searchType == "전체"'>
                                (b.title LIKE #{pattern} OR b.content LIKE #{pattern} OR m.nickname LIKE #{pattern})
                            </when>
                            <when test='searchType == "글"'>
                                (b.title LIKE #{pattern} OR b.content LIKE #{pattern})
                            </when>
                            <when test='searchType == "작성자"'>
                                m.nickname LIKE #{pattern}
                            </when>
                        </choose>
                    </if>
                </where>
                GROUP BY b.id, b.title, m.nickname, b.board_type, b.views, b.member_id
                ORDER BY b.id DESC
                LIMIT #{offset}, #{pageAmount}
                </script>
            """)
    List<Board> selectAllPaging(@Param("offset") Integer offset, @Param("pageAmount") Integer pageAmount, @Param("boardType") String boardType, @Param("searchType") String searchType, @Param("keyword") String keyword);


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
                        WHERE board_id=#{id};

            """)
    int deleteLikeByBoardId(Integer id);

    @Insert("""
                INSERT INTO board_report (board_id, member_id, content, reportType)
                VALUES (#{boardId}, #{memberId}, #{content}, #{reportType})
            """)
    int insertReport(BoardReport boardReport);

    @Select("""
                SELECT COUNT(*) FROM board_report
                WHERE board_id=#{boardId} AND member_id=#{memberId}
            """)
    int selectCountReportWithPrimaryKey(BoardReport boardReport);

    @Select("""
                    SELECT COUNT(*)FROM board_report;

            """)
    Integer selectAllCountWithReportBoard();

    @Select("""
            <script>
                SELECT COUNT(DISTINCT b.id)
                FROM board b 
                JOIN member m ON b.member_id = m.id
                JOIN board_report br ON b.id = br.board_id
                <where>
                    <if test="boardType != null and boardType != '전체'">
                        b.board_type = #{boardType}
                    </if>
                    <if test="searchType != null and keyword != null and keyword != ''">
                        <bind name="pattern" value="'%' + keyword + '%'" />
                        AND
                        <choose>
                            <when test='searchType == "전체"'>
                                (b.title LIKE #{pattern} OR b.content LIKE #{pattern} OR m.nickname LIKE #{pattern})
                            </when>
                            <when test='searchType == "글"'>
                                (b.title LIKE #{pattern} OR b.content LIKE #{pattern})
                            </when>
                            <when test='searchType == "작성자"'>
                                m.nickname LIKE #{pattern}
                            </when>
                        </choose>
                    </if>
                </where>
            </script>
            """)
    Integer selectByBoardTypeWithReportBoard(String boardType, String searchType, String keyword);

    @Select("""
            <script>
            SELECT b.id,
                   b.title,
                   m.nickname writer,
                   b.board_type,
                   b.views,
                   b.member_id,
                    br.member_id repoterId,
                    COUNT(br.board_id) number_of_reports,
                   COUNT(DISTINCT f.name) number_of_images,
                   COUNT(DISTINCT l.member_id) number_of_likes,
                   COUNT(DISTINCT c.id) number_of_comments
            FROM board b
            JOIN member m ON b.member_id = m.id
            JOIN board_report br ON b.id = br.board_id
            LEFT JOIN board_file f ON b.id = f.board_id
            LEFT JOIN board_like l ON b.id = l.board_id
            LEFT JOIN board_comment c ON b.id = c.board_id
            <where>
                <if test="boardType != null and boardType != '전체'">
                    b.board_type = #{boardType}
                </if>
                <if test="searchType != null and keyword != null and keyword != ''">
                    <bind name="pattern" value="'%' + keyword + '%'" />
                    AND
                    <choose>
                        <when test='searchType == "전체"'>
                            (b.title LIKE #{pattern} OR b.content LIKE #{pattern} OR m.nickname LIKE #{pattern})
                        </when>
                        <when test='searchType == "글"'>
                            (b.title LIKE #{pattern} OR b.content LIKE #{pattern})
                        </when>
                        <when test='searchType == "작성자"'>
                            m.nickname LIKE #{pattern}
                        </when>
                    </choose>
                </if>
            </where>
            GROUP BY b.id, b.title, m.nickname, b.board_type, b.views, b.member_id
            ORDER BY b.id DESC
            LIMIT #{offset}, #{pageAmount}
            </script>
            """)
    List<Board> selectAllPagingWithReportBoard(Integer offset, Integer pageAmount, String boardType, String searchType, String keyword);

    @Select("""
            SELECT * FROM board
            WHERE id = #{boardId} 
            """)
    Board selectBoardById(Integer boardId);

    @Select("""
                SELECT br.board_id, m.nickname as reporter, br.content, br.reportType
                FROM board_report br
                JOIN member m ON br.member_id = m.id
                WHERE br.board_id = #{boardId} ;
            """)
    List<BoardReport> selectReportsByBoardId(Integer boardId);
}
