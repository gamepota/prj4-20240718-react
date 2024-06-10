package com.backend.controller.member;

import com.backend.domain.member.Member;
import com.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService service;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody Member member) {
        service.signup(member);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "check", params = "email")
    public ResponseEntity checkEmail(@RequestParam("email") String email) {
        Member member = service.getByEmail(email);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(email);
    }

    @GetMapping(value = "check", params = "nickname")
    public ResponseEntity checkNickname(@RequestParam("nickname") String nickname) {
        Member member = service.getByNickname(nickname);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(nickname);
    }
}