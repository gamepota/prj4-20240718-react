package com.backend.service.place;

import com.backend.domain.member.Member;
import com.backend.domain.place.HospitalComment;
import com.backend.mapper.member.MemberMapper;
import com.backend.mapper.place.HospitalCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class HospitalCommentService {
    final HospitalCommentMapper mapper;
    private final MemberMapper memberMapper;

    public void add(HospitalComment hospitalComment, Authentication authentication) {
        // 유저 이름을 가진 유저를 검색
        String username = hospitalComment.getUsername();
        Member member = memberMapper.detectByUsername(username);

        if (member != null) {
            // 회원 ID를 설정
            hospitalComment.setMemberId(member.getId());

            // 코멘트를 hospital_comment 테이블에 삽입
            mapper.insert(hospitalComment);
        } else {
            throw new UsernameNotFoundException("Username not found: " + username);
        }

    }

    public boolean validate(HospitalComment hospitalComment) {
        if (hospitalComment == null) {
            return false;
        }
        if (hospitalComment.getComment().isBlank()) {
            return false;
        }
        return true;
    }

    public List<HospitalComment> list(Integer hospitalId) {

        return mapper.selectByHospitalId(hospitalId);
    }

    public void remove(HospitalComment hospitalComment) {
        mapper.deleteById(hospitalComment.getId());
    }

    public boolean hasAccess(HospitalComment hospitalComment, Authentication authentication) {
        HospitalComment db = mapper.selectById(hospitalComment.getId());
        if (db == null) {
            return false;
        }

        if (authentication.getName().equals(db.getMemberId().toString())) {
            return false;
        }

        return true;
    }

    public void edit(HospitalComment hospitalComment) {
        mapper.update(hospitalComment);
    }
}

