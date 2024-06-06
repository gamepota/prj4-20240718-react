package com.backend.diary.service;

import com.backend.diary.domain.diaryBoard;
import com.backend.diary.mapper.diaryBoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class diaryBoardService {
    private final diaryBoardMapper mapper;

    public void add(diaryBoard diaryBoard) {
        mapper.insert(diaryBoard);
    }

    public boolean validate(diaryBoard diaryBoard) {
        return true;
    }


}
