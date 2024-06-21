USE prj3;

CREATE TABLE board
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    title    VARCHAR(100)  NOT NULL,
    content  VARCHAR(1000) NOT NULL,
    writer   VARCHAR(100)  NOT NULL,
    inserted DATETIME      NOT NULL DEFAULT NOW()
);
CREATE TABLE board_file
(
    board_id INT          NOT NULL REFERENCES board (id),
    name     VARCHAR(500) NOT NULL,
    PRIMARY KEY (board_id, name)
);
ALTER TABLE board
    ADD COLUMN board_type VARCHAR(50);

SELECT *
FROM board_file;

SELECT *
FROM board;

SELECT *
FROM member;


#memberId속성 추가 및 writer삭제
ALTER TABLE board
    ADD COLUMN member_id INT REFERENCES member (id) AFTER content;
#memberId속성 대입
UPDATE board
SET member_id = 28;
#memberId속성 무결성 보장...
ALTER TABLE board
    MODIFY COLUMN member_id INT NOT NULL;

#writer삭제
ALTER TABLE board
    DROP COLUMN writer;
#writer 쿼리 대체하기 전까지 임시 사용...
ALTER TABLE board
    ADD COLUMN writer VARCHAR(50); -- 삭제한 컬럼의 정의를 정확히 복구합니다.
UPDATE board
SET writer='test';
#조회수 컬럼 추가...
ALTER TABLE board
    ADD COLUMN views INT;
UPDATE board
SET views=0;



UPDATE board
SET board_type='자유'
WHERE board_type = 'free';


UPDATE board
SET board_type='사진 공유'
WHERE id % 2 = 0;

UPDATE board
SET board_type='반려동물 건강'
WHERE id % 3 = 0;

UPDATE board
SET board_type='질문/답변'
WHERE id % 7 = 0;

UPDATE board
SET board_type='훈련/교육'
WHERE id % 11 = 0;

UPDATE board
SET board_type='리뷰'
WHERE id % 13 = 0;

UPDATE board
SET board_type='이벤트/모임'
WHERE id % 17 = 0;

CREATE TABLE board_comment
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    board_id  INT          NOT NULL REFERENCES board (id),
    member_id INT          NOT NULL REFERENCES member (id),
    comment   VARCHAR(500) NOT NULL,
    inserted  DATETIME     NOT NULL DEFAULT NOW()
);

SELECT *
FROM board_comment;


#id 컬럼 board_id로 변경
ALTER TABLE board
    CHANGE board_id id INT AUTO_INCREMENT;
#데이터 무결성 보장
ALTER TABLE board
    ADD CONSTRAINT board_id UNIQUE (board_id);



INSERT INTO board(title, content, writer)
SELECT title, content, writer
FROM board;

SELECT COUNT(*)
FROM board;











