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
        Member dbMember = mapper.selectByUsername(member.getUsername());
        if (dbMember != null && passwordEncoder.matches(member.getPassword(), dbMember.getPassword())) {
            String accessToken = jwtUtil.createJwt("access", dbMember.getUsername(), dbMember.getRole().name(), 600000L); // 10분 유효
            String refreshToken = jwtUtil.createJwt("refresh", dbMember.getUsername(), dbMember.getRole().name(), 86400000L); // 24시간 유효

            Map<String, Object> result = new HashMap<>();
            result.put("access", accessToken);
            result.put("refresh", refreshToken);
            result.put("id", dbMember.getId());
            mapper.updateLoginStatus(dbMember.getId(), true, LocalDateTime.now());
            return result;
        }
        return null;
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