package com.backend.mapper.diary;

import com.backend.domain.diary.DiaryBoard;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DiaryBoardMapper {

    @Insert("""
                INSERT INTO diary(title, content, member_id)
                VALUES (#{title}, #{content}, #{memberId})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(DiaryBoard diaryBoard);

    @Select("""
                SELECT
                d.id,
                d.title,
                m.nick_name AS writer
                FROM diary d
                JOIN member m ON d.member_id = m.id
                ORDER BY d.id DESC
            """)
    List<DiaryBoard> selectAll();

    @Select("""
                SELECT d.id,
                       d.title,
                       d.content,
                       d.inserted,
                       m.nick_name AS writer,
                       d.member_id
                FROM diary d
                JOIN member m ON d.member_id = m.id
                WHERE d.id = #{id}
            """)
    DiaryBoard selectById(Integer id);

    @Delete("""
            DELETE FROM diary
            WHERE id = #{id}
            """)
    int deleteById(Integer id);

    @Update("""
                UPDATE diary
                SET title = #{title},
                    content = #{content}
                WHERE id = #{id}
            """)
    int update(DiaryBoard diaryBoard);

    @Select("""
                <script>
                SELECT d.id,
                       d.title,
                       m.nick_name AS writer,
                       COUNT(DISTINCT f.name) AS number_of_images,
                       COUNT(DISTINCT c.id) AS number_of_comments
                FROM diary d
                JOIN member m ON d.member_id = m.id
                LEFT JOIN diary_file f ON d.id = f.diary_id
                LEFT JOIN diaryComment c ON d.id = c.diary_id
                <where>
                <if test="searchType != null">
                <bind name="pattern" value="'%' + keyword + '%'"/>
                <if test="searchType == 'all' or searchType == 'text'">
                OR d.title LIKE #{pattern}
                OR d.content LIKE #{pattern}
                </if>
                <if test="searchType == 'all' or searchType == 'nickName'">
                OR m.nick_name LIKE #{pattern}
                </if>
                </if>
                </where>
                GROUP BY d.id
                ORDER BY d.id DESC
                LIMIT #{offset}, 10
                </script>
            """)
    List<DiaryBoard> selectAllPaging(@Param("offset") Integer offset, @Param("searchType") String searchType, @Param("keyword") String keyword);

    @Select("""
            <script>
            SELECT COUNT(d.id)
            FROM diary d
            JOIN member m ON d.member_id = m.id
            <where>
            <if test="searchType != null">
                <bind name="pattern" value="'%' + keyword + '%'" />
                <if test="searchType == 'all' or searchType == 'text'">
                    OR d.title LIKE #{pattern}
                    OR d.content LIKE #{pattern}
                </if>
                <if test="searchType == 'all' or searchType == 'nickName'">
                    OR m.nick_name LIKE #{pattern}
                </if>
            </if>
            </where>
            </script>
            """)
    Integer countAllWithSearch(@Param("searchType") String searchType, @Param("keyword") String keyword);

    @Insert("""
                INSERT INTO diary_file(diary_id, name)
                VALUES (#{diaryId}, #{name})
            """)
    int insertFileName(@Param("diaryId") Integer diaryId, @Param("name") String name);

    @Select("""
                SELECT name
                FROM diary_file
                WHERE diary_id = #{diaryId}
            """)
    List<String> selectFileNameByDiaryId(Integer diaryId);
}
