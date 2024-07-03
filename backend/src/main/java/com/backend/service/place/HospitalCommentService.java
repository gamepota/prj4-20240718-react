package com.backend.service.place;

import com.backend.domain.place.HospitalComment;
import com.backend.mapper.place.HospitalCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class HospitalCommentService {
    final HospitalCommentMapper mapper;


    public void add(HospitalComment hospitalComment, Authentication authentication) {

        mapper.insert(hospitalComment);


    }

    public boolean validate(HospitalComment hospitalComment) {
        if (hospitalComment == null) {
            return false;
        }
        if (hospitalComment.getComment().isBlank()) {
            return false;
        }
        return true;
    }

    public List<HospitalComment> list(Integer hospitalId) {

        return mapper.selectByHospitalId(hospitalId);
    }

    public void remove(HospitalComment hospitalComment) {
        mapper.deleteById(hospitalComment.getId());
    }

    public boolean hasAccess(HospitalComment hospitalComment) {
        HospitalComment db = mapper.selectById(hospitalComment.getId());
        if (db == null) {
            return false;
        }

        return true;
    }

    public void edit(HospitalComment hospitalComment) {
        mapper.update(hospitalComment);
    }


}

