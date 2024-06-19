package com.backend.service.member;

import com.backend.domain.member.Member;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationResponseService {
    public Map<String, Object> getToken(Member member) {
        Member dbMember = memberMapper.selectByUsername(member.getUsername());
        if (dbMember != null && passwordEncoder.matches(member.getPassword(), dbMember.getPassword())) {
            String accessToken = jwtUtil.createJwt("access", dbMember.getUsername(), dbMember.getRole().name(), 600000L); // 10분 유효
            String refreshToken = jwtUtil.createJwt("refresh", dbMember.getUsername(), dbMember.getRole().name(), 86400000L); // 24시간 유효

            Map<String, Object> result = new HashMap<>();
            result.put("access", accessToken);
            result.put("refresh", refreshToken);
            result.put("id", dbMember.getId());
            memberMapper.updateLoginStatus(dbMember.getId(), true, LocalDateTime.now());
            return result;
        }
        return null;
    }
}