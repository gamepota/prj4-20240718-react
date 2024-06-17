package com.backend.mapper.diary;


import com.backend.domain.diary.DiaryBoard;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DiaryBoardMapper {

    @Insert("""
                INSERT INTO diary(title,content,member_id)
                VALUES (#{title}, #{content},#{member_id})
            """)
    int insert(DiaryBoard diaryBoard);


    @Select("""
                SELECT
                d.id,
                d.title,
                m.member_id writer,
                FROM diary d JOIN member m ON d.member_id = m.id
                ORDER BY d.id DESC
            """)
    List<DiaryBoard> selectAll();


    @Select("""
                SELECT d.id,
                       d.title,
                       d.content,
                       d.inserted,
                       m.nick_name writer,
                       d.member_id
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
                SET title=#{title},
                    content=#{content}
                WHERE id=#{id}
            """)
    int update(DiaryBoard diaryBoard);

    Integer countAllWithSearch(String searchType, String keyword);

    @Select("""
                <script>
                SELECT d.id,
                       d.title,
                       m.nick_name writer,
                       COUNT(DISTINCT f.name) number_of_images,
                       COUNT(DISTINCT c.id) number_of_comments
                FROM diary d JOIN member m ON d.member_id = m.id
                LEFT JOIN diary_file f ON d.id = f.diary_id
                LEFT JOIN diaryComment c ON d.id = c.diary_id
                <trim prefix="WHERE" prefixOverrides="OR">
                <if test = "searchType != null">
                <bind name = "pattern" value="'%' + keyword + '%'"/>
                <if test = "searchType == 'all' || searchType == 'text'">
                OR d.title LIKE #{pattern}
                OR d.content LIKE #{pattern}
                </if>
                    <if test = "searchType == 'all' || searchType == 'nickName'">
                    OR m.nick_name LIKE #{pattern}
                </if>
                    </if>
                    </trim>
                    GROUP BY d.id,
                        ORDER BY d.id DESC
                LIMIT #{offset}, 10
                </script>
            """)
    List<DiaryBoard> selectAllPaging(Integer offset, String searchType, String keyword);

    @Insert("""
                INSERT INTO diary_file(diary_id,name)
                VALUES (#{diaryId}, #{name})
            """)
    int insertFileName(Integer diaryId, String name);

    @Select("""
                SELECT name
                FROM diary_file
                WHERE diary_id = #{diaryId}
            """)
    List<String> selectFileNameByDiaryId(Integer diaryId);
}
