package com.backend.controller.member;

import com.backend.domain.member.Member;
import com.backend.domain.member.Profile;
import com.backend.service.member.EmailSenderService;
import com.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService service;
    private final EmailSenderService emailSenderService;

    // MemberSignup
    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody Member member) {
        service.signup(member);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "check", params = "username")
    public ResponseEntity checkUsername(@RequestParam("username") String username) {
        System.out.println("username = " + username);
        Member member = service.getByUsername(username);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(username);
    }

    @GetMapping(value = "check", params = "nickname")
    public ResponseEntity checkNickname(@RequestParam("nickname") String nickname) {
        Member member = service.getByNickname(nickname);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(nickname);
    }

    // MemberEdit
    @GetMapping("/{id}")
    public ResponseEntity<Member> getById(@PathVariable Integer id) {
        Member member = service.getById(id);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(member);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity update(@PathVariable Integer id, @RequestBody Member member) {
        if (service.update(id, member)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // MemberPage
    @PostMapping("/profile/{id}")
    public ResponseEntity<Map<String, String>> uploadProfileImage(@PathVariable Integer id, @RequestParam("profileImage") MultipartFile file) {
        try {
            service.saveProfileImage(id, file);
            Profile profile = service.getProfileByMemberId(id); // 저장된 프로필 가져오기
            String imageUrl = service.getSrcPrefix() + profile.getUploadPath(); // 프로필 이미지 URL 생성

            Map<String, String> response = new HashMap<>();
            response.put("message", "프로필 이미지가 저장되었습니다.");
            response.put("profileImage", imageUrl); // 저장된 프로필 이미지 URL 추가
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "프로필 이미지 저장 실패"));
        }
    }

    @DeleteMapping("/profile/{id}")
    public ResponseEntity<String> deleteProfileImage(@PathVariable Integer id) {
        try {
            service.deleteProfileByMemberId(id);
            return ResponseEntity.ok("프로필 이미지 삭제 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로필 이미지 삭제 실패");
        }
    }

    // MemberDelete
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id, @RequestParam(required = false) String password, @RequestHeader(value = "memberInfoId") Integer memberInfoId) {
        if (memberInfoId == 1 || (password != null && service.validatePassword(id, password))) {
            service.delete(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    // MemberList
    @GetMapping("/list")
    public List<Member> list() {
        return service.list();
    }

    // MemberFind
    @GetMapping("/find")
    public String findPassword(Model model) {
        return "/member/find";
    }

    @Transactional
    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        Member memberEmail = service.getByUsername(username);
        if (memberEmail == null) {
            return ResponseEntity.notFound().build();
        }
        String tempPassword = emailSenderService.createMail(username);
        return ResponseEntity.ok(tempPassword);
    }

    // 다이어리 ID 검증
    @GetMapping("/validateDiaryId/{diaryId}")
    public ResponseEntity<Map<String, Object>> validateDiaryId(@PathVariable String diaryId) {
        Map<String, Object> response = new HashMap<>();
        Member member = service.getMemberByDiaryId(diaryId);

        System.out.println("Diary ID: " + diaryId);  // 로그 추가
        System.out.println("Member found: " + (member != null));  // 로그 추가

        if (member != null) {
            response.put("isValid", true);
            response.put("nickname", member.getNickname());
            return ResponseEntity.ok(response);
        } else {
            response.put("isValid", false);
            return ResponseEntity.ok(response);
        }
    }
}
