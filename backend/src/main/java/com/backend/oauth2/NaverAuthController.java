package com.backend.oauth2;

import com.backend.security.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/api/member/login")
@RequiredArgsConstructor
public class NaverAuthController {

    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.naver.redirect-uri}")
    private String redirectUri;

    private final String state = "random_state_string"; // CSRF 방지를 위한 상태값 (랜덤 문자열 생성)
    private final JWTUtil jwtUtil;

    @GetMapping("/naver")
    public ResponseEntity<Map<String, String>> naverLogin() {
        String naverAuthUrl = String.format(
                "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=%s&redirect_uri=%s&state=%s",
                clientId, redirectUri, state
        );
        return ResponseEntity.ok(Map.of("url", naverAuthUrl));
    }

    @GetMapping("/oauth2/code/naver")
    public ResponseEntity<?> naverCallback(@RequestParam String code, @RequestParam String state) {
        if (!this.state.equals(state)) {
            return ResponseEntity.badRequest().body("Invalid state");
        }

        String tokenUrl = String.format(
                "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=%s&client_secret=%s&code=%s&state=%s",
                clientId, clientSecret, code, state
        );

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, null, Map.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            Map<String, Object> responseBody = response.getBody();
            String accessToken = (String) responseBody.get("access_token");

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<Map> userInfoResponse = restTemplate.exchange(
                    "https://openapi.naver.com/v1/nid/me",
                    HttpMethod.GET,
                    entity,
                    Map.class
            );

            if (userInfoResponse.getStatusCode().is2xxSuccessful()) {
                Map<String, Object> userInfo = (Map<String, Object>) userInfoResponse.getBody().get("response");

                // 사용자 정보를 이용해 JWT 토큰 생성
                String username = userInfo.get("email").toString();
                String role = "ROLE_USER"; // 기본 역할 설정

                String accessJwt = jwtUtil.createJwt("access", username, role, 600000L);
                String refreshJwt = jwtUtil.createJwt("refresh", username, role, 86400000L);

                // 프론트엔드로 리디렉션
                String redirectUrl = "http://localhost:5173/oauth2/code/naver?access=" + accessJwt + "&refresh=" + refreshJwt;
                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.setLocation(URI.create(redirectUrl));
                return new ResponseEntity<>(responseHeaders, HttpStatus.FOUND);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
