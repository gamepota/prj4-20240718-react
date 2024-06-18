package com.backend.controller.member;

import com.backend.domain.member.Member;
import com.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService service;

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


    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberInfoById(@PathVariable Integer id) {
        try {
            Member member = service.getMemberInfoById(id);
            return ResponseEntity.ok().body(member);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // MemberLogin

    @GetMapping
    public String login() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iter = authorities.iterator();
        GrantedAuthority auth = iter.next();
        String role = auth.getAuthority();

        return "Login" + username + " " + role;
    }

//    @PostMapping("/token")
//    public ResponseEntity token(@RequestBody Member member) {
//        Map<String, Object> map = service.getToken(member);
//
//        if (map == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//
//        return ResponseEntity.ok(map);
//    }

    // MemberList
    @GetMapping("/list")
    public List<Member> list() {
        return service.list();
    }

    // MemberEdit
    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Integer id, @RequestBody Member member) {
        if (service.update(id, member)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}