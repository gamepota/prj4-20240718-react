package com.backend.service.comment;

import com.backend.domain.comment.HospitalComment;
import com.backend.mapper.comment.HospitalCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class HospitalCommentService {
    final HospitalCommentMapper mapper;

    public void add(HospitalComment hospitalComment, Authentication authentication) {
        hospitalComment.setMemberId(Integer.valueOf(authentication.getName()));
        mapper.insert(hospitalComment);
    }
}
