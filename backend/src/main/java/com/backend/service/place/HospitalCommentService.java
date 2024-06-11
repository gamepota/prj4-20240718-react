package com.backend.service.place;

import com.backend.domain.place.HospitalComment;
import com.backend.mapper.place.HospitalCommentMapper;
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

        mapper.insert(hospitalComment);
    }
}
