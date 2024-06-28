package com.backend.mapper.diary;

import com.backend.domain.diary.DiaryBoard;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DiaryBoardMapper {

    @Insert("""
                INSERT INTO diary(title, content, member_id,username)
                VALUES (#{title}, #{content},  #{memberId},#{username})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    public int insert(DiaryBoard diaryBoard);

    @Select("""
                SELECT
                d.id,
                d.title,
                m.nickname writer
                FROM diary d JOIN member m ON d.member_id = m.id
                ORDER BY d.id DESC
            """)
    List<DiaryBoard> selectAll();

    @Select("""
                SELECT d.id,
                       d.title,
                       d.content,
                       d.inserted,
                       m.nickname writer,
                       d.member_id,
                       d.username
                FROM diary d JOIN member m ON d.member_id = m.id
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
                    content = #{content},
                    username = #{username},
                    nickname = #{nickname}
                WHERE id = #{id}
            """)
    int update(DiaryBoard diaryBoard);

    @Select("""
                <script>
                SELECT d.id,
                       d.title,
                       m.nickname writer,
                       d.inserted,
                       COUNT(DISTINCT f.name) AS number_of_images
                FROM diary d
                JOIN member m ON d.member_id = m.id
                LEFT JOIN diary_file f ON d.id = f.diary_id
                <where>
                <if test="searchType != null">
                <bind name="pattern" value="'%' + keyword + '%'"/>
                <if test="searchType == 'all'">
                    (d.title LIKE #{pattern} OR d.content LIKE #{pattern} OR m.nickname LIKE #{pattern})
                </if>
                <if test="searchType == 'text'">
                    (d.title LIKE #{pattern} OR d.content LIKE #{pattern})
                </if>
                <if test="searchType == 'nickname'">
                    m.nickname LIKE #{pattern}
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
                FROM diary d JOIN member m ON d.member_id = m.id
                <where>
                <if test="searchType != null">
                    <bind name="pattern" value="'%' + keyword + '%'" />
                    <if test="searchType == 'all'">
                        (d.title LIKE #{pattern} OR d.content LIKE #{pattern} OR m.nickname LIKE #{pattern})
                    </if>
                    <if test="searchType == 'text'">
                        (d.title LIKE #{pattern} OR d.content LIKE #{pattern})
                    </if>
                    <if test="searchType == 'nickname'">
                        m.nickname LIKE #{pattern}
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
    int insertFileName(Integer diaryId, String name);

    @Select("""
                SELECT name
                FROM diary_file
                WHERE diary_id = #{diaryId}
            """)
    List<String> selectFileNameByDiaryId(Integer diaryId);


    @Delete("""
                DELETE FROM diary
                WHERE member_id = #{memberId}
            """)
    int deleteByMemberId(Integer memberId);


    @Select("""
                SELECT COUNT(*)
                FROM diary
            """)
    int countAll();

    @Delete("""
            DELETE FROM diary_file
            WHERE diary_id = #{diaryId}
            """)
    int deleteFileByDiaryId(Integer diaryId);

    @Select("""
                SELECT id
                FROM diary
                WHERE member_id = #{memberId}
            """)
    List<DiaryBoard> selectByMemberId(Integer memberId);

    @Delete("""
            DELETE FROM diary_file
            WHERE diary_id=#{diaryId}
              AND name=#{fileName}
            """)
    int deleteFileByDiaryIdAndName(Integer diaryId, String fileName);
}
