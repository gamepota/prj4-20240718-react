package com.backend.controller.member;

import com.backend.domain.member.RefreshEntity;
import com.backend.mapper.member.RefreshMapper;
import com.backend.security.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;

@RestController
@RequestMapping("/api/member")
public class ReissueController {

    private final JWTUtil jwtUtil;
    private final RefreshMapper refreshMapper;

    public ReissueController(JWTUtil jwtUtil, RefreshMapper refreshMapper) {

        this.jwtUtil = jwtUtil;
        this.refreshMapper = refreshMapper;
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {

        // Refresh token 발급
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {

            if (cookie.getName().equals("refresh")) {

                refresh = cookie.getValue();
            }
        }

        if (refresh == null) {

            // response status code
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }

        // 만료 확인
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {

            // response status code
            return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
        }

        // 토큰이 refresh 인지 확인
        String category = jwtUtil.getCategory(refresh);

        if (!category.equals("refresh")) {

            // response status code
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        // db에 저장되어 있는지 확인
        Boolean isExist = refreshMapper.existsByRefresh(refresh);
        if (!isExist) {

            //response body
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        String username = jwtUtil.getUsername(refresh);
        String role = jwtUtil.getRole(refresh);

        // JWT 신규 발급
        String newAccess = jwtUtil.createJwt("access", username, role, 600000L);
        String newRefresh = jwtUtil.createJwt("refresh", username, role, 86400000L);

        // Refresh 토큰 저장 db에 기존의 Refresh 토큰 삭제 후 새 Refresh 토큰 저장
        refreshMapper.deleteByRefresh(refresh);
        addRefreshEntity(username, newRefresh, 86400000L);

        // 응답
        response.setHeader("access", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private void addRefreshEntity(String username, String refresh, Long expiredMs) {
        Timestamp expiration = new Timestamp(System.currentTimeMillis() + expiredMs);

        RefreshEntity refreshEntity = new RefreshEntity();
        refreshEntity.setUsername(username);
        refreshEntity.setRefresh(refresh);
        refreshEntity.setExpiration(expiration);

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
