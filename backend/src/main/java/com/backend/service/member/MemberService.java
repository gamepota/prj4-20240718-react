package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.domain.member.Role;
import com.backend.mapper.member.MemberMapper;
import com.backend.security.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberMapper mapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;

    //MemberSignup
    public void signup(Member member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        member.setRole(Role.USER);
        mapper.signup(member);
    }

    public Member getByUsername(String username) {
        return mapper.selectByUsername(username);
    }

    public Member getByNickname(String nickname) {
        return mapper.selectByNickname(nickname);
    }

    // MemberLogin
    public Map<String, Object> getToken(Member member) {
        Map<String, Object> result = null;
        Member db = mapper.selectByUsername(member.getUsername());
        if (db != null) {
            if (passwordEncoder.matches(member.getPassword(), db.getPassword())) {
                result = new HashMap<>();
                String token = jwtUtil.createJwt(member.getUsername(), db.getRole().name(), 60 * 60 * 1000L); // 1시간
                result.put("token", token);
                result.put("id", db.getId());
                mapper.updateLoginStatus(db.getId(), true, LocalDateTime.now());
            }
        }
        return result;
    }

    // MemberList
    public List<Member> list() {
        return mapper.selectAll();
    }

    // MemberEdit
    public boolean update(Integer id, Member member) {
        member.setId(id);
        // 비밀번호가 변경된 경우만 암호화
        if (member.getPassword() != null && !member.getPassword().isEmpty()) {
            member.setPassword(passwordEncoder.encode(member.getPassword()));
        }
        return mapper.update(member) > 0;
    }

    public Member getMemberInfoById(Integer id) {
        return mapper.selectByMemberId(id);
    }
}