package com.backend.service.diary;

import com.backend.domain.diary.DiaryComment;
import com.backend.mapper.diary.DiaryCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class DiaryCommentService {

    final DiaryCommentMapper mapper;

    public void addComment(DiaryComment diaryComment, Authentication authentication) {
        mapper.diaryCommentInsert(diaryComment, authentication);
    }
}
