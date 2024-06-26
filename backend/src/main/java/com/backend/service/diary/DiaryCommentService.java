// DiaryCommentService.java
package com.backend.service.diary;

import com.backend.domain.diary.DiaryComment;
import com.backend.domain.member.Member;
import com.backend.mapper.diary.DiaryCommentMapper;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class DiaryCommentService {
    final DiaryCommentMapper mapper;
    private final MemberMapper memberMapper;

    public void addComment(DiaryComment diaryComment, Authentication authentication) {
        String nickname = diaryComment.getNickname();
        Member member = memberMapper.selectByNickname(nickname);

        if (member != null) {
            diaryComment.setMemberId(member.getId());

            mapper.diaryCommentInsert(diaryComment);
        } else {
            throw new UsernameNotFoundException("Username not fount:" + nickname);
        }

    }

    public List<DiaryComment> listComment(Integer id) {
        return mapper.selectByDiaryId(id);
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

    public boolean validate(DiaryComment diaryComment) {
        if (diaryComment == null) {
            return false;
        }
        if (diaryComment.getComment().isBlank()) {
            return false;
        }
        return true;
    }

    public boolean hasAccess(DiaryComment diaryComment, Authentication authentication) {
        DiaryComment db = mapper.selectById(diaryComment.getId());

        if (db == null) {
            return false;
        }
        if (authentication.getName().equals(db.getMemberId().toString())) {
            return false;
        }
        return true;
    }
}
