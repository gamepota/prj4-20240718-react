package com.backend.service.diary;

import com.backend.domain.diary.DiaryBoard;
import com.backend.mapper.diary.DiaryBoardMapper;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class DiaryBoardService {
    private final DiaryBoardMapper mapper;
    private final MemberMapper memberMapper;

    public void add(DiaryBoard diaryBoard, MultipartFile[] files, Authentication authentication) {
        diaryBoard.setMemberId(Integer.valueOf(authentication.getName()));
        mapper.insert(diaryBoard);
    }

    public boolean validate(DiaryBoard diaryBoard) {
        if (diaryBoard.getContent() == null || diaryBoard.getContent().isBlank()) {
            return false;
        }
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

    public void edit(DiaryBoard diaryBoard) {
        mapper.update(diaryBoard);
    }

    public boolean hasAccess(Integer id, Authentication authentication) {
        DiaryBoard diaryBoard = mapper.selectById(id);
        return diaryBoard.getMemberId().equals(Integer.valueOf(authentication.getName()));
    }
}
