package com.backend.service.member;

import com.backend.domain.board.Board;
import com.backend.domain.diary.DiaryBoard;
import com.backend.domain.member.Member;
import com.backend.domain.member.Profile;
import com.backend.domain.member.Role;
import com.backend.mapper.board.BoardCommentMapper;
import com.backend.mapper.board.BoardMapper;
import com.backend.mapper.diary.DiaryBoardMapper;
import com.backend.mapper.member.MemberMapper;
import com.backend.mapper.member.ProfileMapper;
import com.backend.mapper.member.RefreshMapper;
import com.backend.service.board.BoardService;
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
    private final DiaryBoardMapper diaryBoardMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final S3Client s3Client;
    private final BoardService boardService;
    private final BoardMapper boardMapper;
    private final BoardCommentMapper boardCommentMapper;

    // s3 설정
    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Value("${image.src.prefix}")
    String srcPrefix;

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

    public void saveProfileImage(Integer memberId, MultipartFile file) throws IOException {
        String fileName = memberId + "_" + file.getOriginalFilename();
        String key = "prj3/" + "profile/" + memberId + "/" + fileName;
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
        //회원이 쓴 게시물 조회
        List<Board> boardList = boardMapper.selectByMemberId(id);

        // 각 게시물 지우기
        boardList.forEach(board -> boardService.delete(board.getId()));

        // 좋아요 지우기
        boardMapper.deleteLikeByMemberId(id);

        // 댓글 지우기
        boardCommentMapper.deleteByMemberId(id);


        List<DiaryBoard> diaryBoardList = diaryBoardMapper.selectByMemberId(id);
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

    // diary ID 유효성 검증
    public Member getMemberByDiaryId(String diaryId) {
        try {
            int userId = Integer.parseInt(diaryId.split("-")[1]) / 17;
            System.out.println("Extracted userId: " + userId);  // 로그 추가
            Member member = memberMapper.selectByMemberId(userId);
            System.out.println("Found member: " + (member != null));  // 로그 추가
            return member;
        } catch (Exception e) {
            return null;
        }
    }
}
