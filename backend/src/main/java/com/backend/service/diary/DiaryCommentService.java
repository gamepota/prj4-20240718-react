// DiaryCommentService.java
package com.backend.service.diary;

import com.backend.domain.diary.DiaryComment;
import com.backend.mapper.diary.DiaryCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class DiaryCommentService {
    final DiaryCommentMapper mapper;

    public void addComment(DiaryComment diaryComment) {
        mapper.diaryCommentInsert(diaryComment);
    }

    public List<DiaryComment> listComment(Integer diaryId) {
        return mapper.selectAllByBoardId(diaryId);
    }

    public void diaryDelete(DiaryComment diaryComment) {
        mapper.deleteById(diaryComment.getId());
    }

    public void diaryUpdate(DiaryComment diaryComment) {
        mapper.diaryUpdate(diaryComment);
    }

    public DiaryComment getById(Integer id) { // 반환 타입 수정
        return mapper.selectById(id);
    }
}
