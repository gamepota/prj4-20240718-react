package com.backend.service.diary;

import com.backend.domain.diary.DiaryComment;
import com.backend.mapper.diary.DiaryCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class DiaryCommentService {

    final DiaryCommentMapper mapper;

    public void addComment(DiaryComment diaryComment, Authentication authentication) {
        diaryComment.setMemberId(Integer.valueOf(authentication.getName()));
        mapper.diaryCommentInsert(diaryComment, authentication);
    }

    public List<DiaryComment> listComment(Integer diaryId) {
        return mapper.selectAllByBoardId(diaryId);
    }

    public boolean validate(DiaryComment diaryComment) {
        if (diaryComment == null) {
            return false;
        }
        if (diaryComment.getComment().isBlank()) {
            return false;
        }
        if (diaryComment.getDiaryId() == null) {
            return false;
        }
        return true;
    }

    public void diaryDelete(DiaryComment diaryComment) {
        mapper.deleteById(diaryComment.getId());
    }

    public boolean hasAcess(DiaryComment diaryComment, Authentication authentication) {
        DiaryComment db = mapper.selectById(diaryComment.getId());

        if (db == null) {
            return false;
        }

        if (!authentication.getName().equals(db.getMemberId().toString())) {
            return false;
        }
        return true;
    }

    public void diaryUpdate(DiaryComment diaryComment) {
        mapper.diaryUpdate(diaryComment);
    }
}
