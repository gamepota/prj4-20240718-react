package com.backend.service.place;

import com.backend.domain.place.Hospital;
import com.backend.mapper.place.HospitalCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class PlaceService {
    private final HospitalCommentMapper mapper;

    public Hospital get(Integer id) {
        return null;
    }
}
