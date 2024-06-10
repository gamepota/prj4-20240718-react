package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.domain.member.Role;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberMapper mapper;
    private final BCryptPasswordEncoder passwordEncoder;

    public void signup(Member member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        member.setRole(Role.USER);
        mapper.signup(member);
    }

    public Member getByEmail(String email) {
        return mapper.selectByEmail(email);
    }

    public Member getByNickname(String nickname) {
        return mapper.selectByNickname(nickname);
    }
}