package com.backend.service.board;


import com.backend.domain.board.Board;
import com.backend.mapper.board.BoardMapper;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BoardService {
    final BoardMapper mapper;
    private static final String PAGE_INFO_SEESION_KEY = "offset";
//    private static final String PAGE_INFO_SEESION_KEY = "keyOffset";


    public void add(Board board) {
        mapper.insert(board);

    }

    public boolean validate(Board board) throws Exception {
        if (board.getTitle() == null || board.getTitle().isBlank()) {
            return false;
        }
        if (board.getContent() == null || board.getContent().isBlank()) {
            return false;
        }
        if (board.getWriter() == null || board.getWriter().isBlank()) {
            return false;
        }
        return true;
    }

    public Map<String, Object> list(Integer page, Integer pageAmount, HttpSession session) throws Exception {


        if (page <= 0) {
            throw new IllegalArgumentException("page must be greater than 0");
        }

        Integer offset = (Integer) session.getAttribute(PAGE_INFO_SEESION_KEY);

        if (offset == null) {
            offset = (page - 1) * pageAmount;
        }


        Map<String, Object> pageInfo = new HashMap();
        Integer countAll = mapper.selectAllCount();
//        System.out.println(page);
        Integer lastPageNumber = (countAll - 1) / pageAmount + 1;
        Integer leftPageNumber = (page - 1) / 10 * 10 + 1;
        Integer rightPageNumber = leftPageNumber + 9;
        rightPageNumber = Math.min(rightPageNumber, lastPageNumber);
//        leftPageNumber = rightPageNumber - 9;
        leftPageNumber = Math.max(leftPageNumber, 1);
        Integer prevPageNumber = leftPageNumber - 1;
        Integer nextPageNumber = rightPageNumber + 1;

        if (prevPageNumber > 0) {
            pageInfo.put("prevPageNumber", prevPageNumber);
        }
        if (nextPageNumber <= lastPageNumber) {
            pageInfo.put("nextPageNumber", nextPageNumber);
        }
//        System.out.println("offset = " + offset);
        pageInfo.put("currentPageNumber", page);
        pageInfo.put("lastPageNumber", lastPageNumber);
        pageInfo.put("leftPageNumber", leftPageNumber);
        pageInfo.put("rightPageNumber", rightPageNumber);
        pageInfo.put("offset", offset);
        session.setAttribute(PAGE_INFO_SEESION_KEY, offset);

        return Map.of("pageInfo", pageInfo,
                "boardList", mapper.selectAllPaging(offset, pageAmount));
    }


    public Board get(Integer id) {
        return mapper.selectById(id);
    }

    public void delete(Integer id) {
        mapper.deleteById(id);
    }

    public void edit(Board board) {
        mapper.update(board);
    }
}
