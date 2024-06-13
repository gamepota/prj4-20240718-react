package com.backend.mapper.diary;

import com.backend.domain.diary.DiaryComment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.security.core.Authentication;

@Mapper
public interface DiaryCommentMapper {

    @Insert("""
                INSERT INTO 
            """)
    int diaryCommentInsert(DiaryComment diaryComment, Authentication authentication);

}
