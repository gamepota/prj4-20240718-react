package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.domain.member.OAuth2Member;
import com.backend.domain.member.Role;
import com.backend.mapper.member.MemberMapper;
import com.backend.oauth2.CustomOAuth2User;
import com.backend.oauth2.NaverResponse;
import com.backend.oauth2.OAuth2Response;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberMapper memberMapper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println(oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("naver")) {

            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else {

            return null;
        }
        //리소스 서버에서 발급 받은 정보로 사용자를 특정할 아이디값을 만듬
        String username = oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId();

        // 사용자 정보를 조회
        Member existMember = memberMapper.selectByUsername(username);

        if (existMember == null) {
            // 사용자 정보가 존재하지 않으면 새로 생성
            Member newMember = new Member();
            newMember.setUsername(username);
            newMember.setEmail(oAuth2Response.getEmail());
            newMember.setName(oAuth2Response.getName());
            newMember.setRole(Role.USER);

            memberMapper.insertMember(newMember);

            OAuth2Member oAuth2Member = new OAuth2Member();
            oAuth2Member.setUsername(username);
            oAuth2Member.setName(oAuth2Response.getName());
            oAuth2Member.setRole(Role.USER.name());

            return new CustomOAuth2User(oAuth2Member);
        } else {
            // 사용자 정보가 존재하면 업데이트
            existMember.setEmail(oAuth2Response.getEmail());
            existMember.setName(oAuth2Response.getName());

            memberMapper.updateMember(existMember);

            OAuth2Member oAuth2Member = new OAuth2Member();
            oAuth2Member.setUsername(existMember.getUsername());
            oAuth2Member.setName(oAuth2Response.getName());
            oAuth2Member.setRole(existMember.getRole().name());


            return new CustomOAuth2User(oAuth2Member);
        }
    }
}
