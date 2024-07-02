package com.backend.security;

import com.backend.domain.member.LoginEntity;
import com.backend.domain.member.RefreshEntity;
import com.backend.mapper.member.LoginCheckMapper;
import com.backend.mapper.member.RefreshMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class CustomLoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final RefreshMapper refreshMapper;
    private final LoginCheckMapper loginCheckMapper;

    public CustomLoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, RefreshMapper refreshMapper, LoginCheckMapper loginCheckMapper) {

        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshMapper = refreshMapper;
        this.loginCheckMapper = loginCheckMapper;

        // 커스텀 로그인 경로 설정
        setFilterProcessesUrl("/api/member/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        System.out.println("username = " + username);
        System.out.println("password = " + password);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);

        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {

        // 유저 정보
        String username = authentication.getName();
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        Integer id = customUserDetails.getId();
        String nickname = customUserDetails.getNickname();

        // LoginCheck
        // 회원이 존재하는지 탐색
        LoginEntity existingRecord = loginCheckMapper.findByMemberNickname(nickname);
        // 존재하지 않는 경우
        if (existingRecord == null) {
            // LoginEntity 인스턴스 생성
            existingRecord = new LoginEntity();
            // 로그인된 닉네임 정보 set
            existingRecord.setMemberNickname(nickname);
        }
        // 로그인 true
        existingRecord.setLoginCheck(true);
        // 멤버정보 insert
        loginCheckMapper.upsertLoginCheck(existingRecord);

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        // 토큰 생성
        String access = jwtUtil.createJwt("access", username, role, 600000L); // 10분
        String refresh = jwtUtil.createJwt("refresh", username, role, 36000000L); // 10시간

        // 토큰 저장
        addRefreshEntity(username, refresh, 36000000L);
        response.addCookie(createCookie("refresh", refresh));
        try {
            if (request.getRequestURI().equals("/api/member/login")) {
                Map<String, String> data = new HashMap<>();
                data.put("id", id.toString());
                data.put("nickname", nickname);
                data.put("access", access);
                String jsonData = new ObjectMapper().writeValueAsString(data);
                // 응답 헤더 설정
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");

                // 응답 본문에 JSON 문자열 작성
                response.getWriter().write(jsonData);
                response.getWriter().flush();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 응답 설정

        response.setStatus(HttpStatus.OK.value());
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {

        response.setStatus(401);
    }

    private void addRefreshEntity(String username, String refresh, Long expiredMs) {
        Timestamp expiration = new Timestamp(System.currentTimeMillis() + expiredMs); // 현재 시간 + 만료 시간으로 Timestamp 생성
        RefreshEntity refreshEntity = new RefreshEntity();
        refreshEntity.setUsername(username);
        refreshEntity.setRefresh(refresh);
        refreshEntity.setExpiration(expiration); // Timestamp 객체 설정

        refreshMapper.insertbyRefresh(refreshEntity);
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24 * 60 * 60);
        //cookie.setSecure(true);
        //cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }
}
