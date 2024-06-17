package com.backend.mapper.diary;


import com.backend.domain.diary.DiaryBoard;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DiaryBoardMapper {

    @Insert("""
                INSERT INTO test(content,writer,title)
                VALUES (#{content}, #{writer},#{title})
            """)
    int insert(DiaryBoard diaryBoard);


    @Select("""
                SELECT
                id,
                title,
                writer
                FROM test
                ORDER BY id DESC
            """)
    List<DiaryBoard> selectAll();


    @Select("""
                SELECT id,
                       content,
                       inserted,
                       writer,
                FROM test
                WHERE id = #{id}
            """)
    DiaryBoard selectById(Integer id);


    @Delete("""
            DELETE FROM test
            WHERE id = #{id}
            """)
    int deleteById(Integer id);


    @Update("""
                UPDATE test
                SET content=#{content},
                    writer=#{writer}
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
                    </tirm>
                    GROUP BY d.id,
                        ORDER BY d.id DESC
                LIMIT #{offset}, 10
                </script>
            """)
    List<DiaryBoard> selectAllPaging(Integer offset, String searchType, String keyword);
}
