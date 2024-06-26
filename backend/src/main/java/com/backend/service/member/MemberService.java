package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.domain.member.Profile;
import com.backend.domain.member.Role;
import com.backend.mapper.member.MemberMapper;
import com.backend.mapper.member.ProfileMapper;
import com.backend.mapper.member.RefreshMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberMapper memberMapper;
    private final RefreshMapper refreshMapper;
    private final ProfileMapper profileMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final S3Client s3Client;

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

    // MemberPage
    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    public void saveProfileImage(Integer memberId, MultipartFile file) throws IOException {
        String fileName = memberId + "_" + file.getOriginalFilename();
        String key = "profile/" + memberId + "/" + fileName;
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .acl(ObjectCannedACL.PUBLIC_READ)
                .build();

        s3Client.putObject(objectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        Profile profile = new Profile();
        profile.setMemberId(memberId);
        profile.setFileName(fileName);
        profile.setUploadPath(key);

        profileMapper.insertProfile(profile);
    }

    public Profile getProfileByMemberId(Integer memberId) {
        return profileMapper.selectProfileByMemberId(memberId);
    }

    public void deleteProfileByMemberId(Integer memberId) {
        Profile profile = profileMapper.selectProfileByMemberId(memberId);
        if (profile != null) {
            profileMapper.deleteProfileByMemberId(memberId);
        }
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

    // MemberDelete
    public void delete(Integer id) {
        refreshMapper.deleteByUsername(getById(id).getUsername());
        memberMapper.deleteById(id);
    }

    public boolean validatePassword(Integer id, String password) {
        Member dbMember = memberMapper.selectByMemberId(id);
        if (dbMember == null) {
            return false;
        }
        return passwordEncoder.matches(password, dbMember.getPassword());
    }

    // MemberList
    public List<Member> list() {
        return memberMapper.selectAll();
    }
}
