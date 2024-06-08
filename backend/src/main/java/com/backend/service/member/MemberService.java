package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberMapper mapper;

    public void signup(Member member) {
        mapper.signup(member);
    }

    public Member getByEmail(String email) {
        return mapper.getEmail(email);
    }

    public Member getByNickname(String nickname) {
        return mapper.getNickname(nickname);
    }


}
