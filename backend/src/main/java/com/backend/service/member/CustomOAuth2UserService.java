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

import java.time.LocalDate;

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
            System.out.println("equal naver! oAuth2Response = " + oAuth2Response);
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else {

            return null;
        }
        //리소스 서버에서 발급 받은 정보로 사용자를 특정할 아이디값을 만듬
        String username = oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId();
        System.out.println("username = " + username);
        // 사용자 정보를 조회
        Member existMember = memberMapper.selectByUsername(oAuth2Response.getUsername());

        if (existMember == null) {
            // 사용자 정보가 존재하지 않으면 새로 생성
            Member newMember = new Member();
            newMember.setName(oAuth2Response.getName());
            newMember.setUsername(oAuth2Response.getUsername());
            newMember.setNickname(oAuth2Response.getName());
            newMember.setPassword("default");
            newMember.setGender("male");
            newMember.setNationality("default");
            newMember.setBirthDate(LocalDate.now());
            newMember.setPhoneNumber("default");
            newMember.setPostcode(1234);
            newMember.setMainAddress("default");
            newMember.setDetailedAddress("default");
            newMember.setInserted(LocalDate.now().atStartOfDay());
            newMember.setRole(Role.USER);

            memberMapper.insertMember(newMember);

            OAuth2Member oAuth2Member = new OAuth2Member();
            oAuth2Member.setUsername(username);
            oAuth2Member.setName(oAuth2Response.getName());
            oAuth2Member.setRole(Role.USER.name());
            System.out.println("if - oAuth2Member.getUsername() = " + oAuth2Member.getUsername());
            return new CustomOAuth2User(oAuth2Member);
        } else {
            // 사용자 정보가 존재하면 업데이트
            existMember.setUsername(oAuth2Response.getUsername());
            existMember.setName(oAuth2Response.getName());

            memberMapper.updateMember(existMember);

            OAuth2Member oAuth2Member = new OAuth2Member();
            oAuth2Member.setUsername(existMember.getUsername());
            oAuth2Member.setName(oAuth2Response.getName());
            oAuth2Member.setRole(existMember.getRole().name());
            System.out.println("else - oAuth2Member.getUsername() = " + oAuth2Member.getUsername());

            return new CustomOAuth2User(oAuth2Member);
        }
    }
}
