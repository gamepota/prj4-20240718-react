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

    public void add(DiaryComment diaryComment, Authentication authentication) {
        String nickname = diaryComment.getNickname();
        Member member = memberMapper.selectByDiaryCommentName(nickname);

        if (member != null) {
            diaryComment.setMemberId(member.getId());

            mapper.diaryCommentInsert(diaryComment);
        } else {
            throw new UsernameNotFoundException("Username not fount:" + nickname);
        }

    }

    public List<DiaryComment> list() {
        return mapper.selectAll();
    }

    public void diaryDelete(Integer id) {
        mapper.deleteById(id);
    }

    public void edit(DiaryComment diaryComment) {
        mapper.diaryUpdate(diaryComment);
    }

    public DiaryComment get(Integer id) { // 반환 타입 수정
        return mapper.selectById(id);
    }

    public boolean validate(DiaryComment diaryComment) {
        if (diaryComment.getComment() == null || diaryComment.getComment().isBlank()) {
            return false;
        }
        return true;
    }

    public boolean hasAccess(Integer id, Authentication authentication, Integer memberId) {
        DiaryComment diaryComment = mapper.selectById(id);


        return diaryComment.getMemberId().equals(memberId);

    }
}
