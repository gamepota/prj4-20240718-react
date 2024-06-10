package com.backend.service.diary;

import com.backend.domain.diary.DiaryBoard;
import com.backend.mapper.diary.DiaryBoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class DiaryBoardService {
    private final DiaryBoardMapper mapper;

    public void add(DiaryBoard diaryBoard) {
        mapper.insert(diaryBoard);
    }

    public boolean validate(DiaryBoard diaryBoard) {
        return true;
    }


    public List<DiaryBoard> list() {
        return mapper.selectAll();

    }

    public DiaryBoard get(Integer id) {

        return mapper.selectById(id);

    }

    public void remove(Integer id) {
        mapper.deleteById(id);
    }
}
