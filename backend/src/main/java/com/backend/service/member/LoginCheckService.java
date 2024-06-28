package com.backend.service.member;

import com.backend.mapper.member.LoginCheckMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginCheckService {

    private final LoginCheckMapper loginCheckMapper;
}
