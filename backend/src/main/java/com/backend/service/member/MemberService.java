package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.domain.member.Role;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberMapper memberMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    //MemberSignup
    public void signup(Member member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        member.setRole(Role.USER);
        memberMapper.signup(member);
    }

    public Member getByUsername(String username) {
        return memberMapper.selectByUsername(username);
    }

    public Member getByNickname(String nickname) {
        return memberMapper.selectByNickname(nickname);
    }

    // MemberList
    public List<Member> list() {
        return memberMapper.selectAll();
    }

    // MemberEdit
    public Member getById(Integer id) {
        return memberMapper.selectByMemberId(id);
    }

    public boolean update(Integer id, Member member) {
        member.setId(id);
        // 비밀번호가 변경된 경우만 암호화
        if (member.getPassword() != null && !member.getPassword().isEmpty()) {
            member.setPassword(passwordEncoder.encode(member.getPassword()));
        }
        return memberMapper.update(member) > 0;
    }
}
