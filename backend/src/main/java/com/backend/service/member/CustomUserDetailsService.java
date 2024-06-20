package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.mapper.member.MemberMapper;
import com.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberMapper memberMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // db 에서 조회
        Member member = memberMapper.selectByUsername(username);

        if (member == null) {
            throw new UsernameNotFoundException("찾을 수 없습니다.");
        }

        // UserDetails 에 담아서 반환하면 AuthenticationManager 가 검증
        return new CustomUserDetails(member);
    }
}
