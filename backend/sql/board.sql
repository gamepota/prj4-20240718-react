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
SET board_type='사진 공유'
WHERE id = 551
   OR id = 550;



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
#임시 댓글 테이블...
CREATE TABLE board_comment
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    board_id      INT          NOT NULL REFERENCES board (id),
    board_comment VARCHAR(500) NOT NULL,
    inserted      DATETIME     NOT NULL DEFAULT NOW()
);
DROP TABLE board_comment;
#좋아요 테이블...
CREATE TABLE board_like
(
    board_id  INT NOT NULL REFERENCES board (id),
    member_id INT NOT NULL REFERENCES member (id),
    PRIMARY KEY (board_id, member_id)
);
UPDATE board
SET views=1;


# 임시 댓글테이블 member_id없이 수정
SHOW CREATE TABLE board;

#댓글테이블 삭제 후 member_id다시 설정...
DROP TABLE board_comment;

#댓글테이블 board_comment속성 추가 및 데이터 백업...
ALTER TABLE board_comment
    CHANGE COLUMN comment board_comment VARCHAR(255);

CREATE TABLE board_comment
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    board_id  INT          NOT NULL REFERENCES board (id),
    member_id INT          NOT NULL REFERENCES member (id),
    comment   VARCHAR(500) NOT NULL,
    inserted  DATETIME     NOT NULL DEFAULT NOW()
);
CREATE TABLE board_report
(
    board_id  INT          NOT NULL REFERENCES board (id) ON DELETE CASCADE,
    member_id INT          NOT NULL REFERENCES member (id) ON DELETE CASCADE,
    content   VARCHAR(500) NOT NULL,
    PRIMARY KEY (board_id, member_id)

);
SELECT *
FROM board_report



SELECT *
FROM board_comment;

SELECT *
FROM board;

SELECT *
FROM board_like;



ALTER TABLE board
    DROP FOREIGN KEY board_ibfk_1;

ALTER TABLE board_comment
    DROP COLUMN comment,
    ADD COLUMN board_comment VARCHAR(255);

SHOW CREATE TABLE board_comment;

ALTER TABLE board_comment
    ADD COLUMN board_comment VARCHAR(255);


ALTER TAbLE board_comment
    DROP FOREIGN KEY board_comment_ibfk_2;

ALTER TABLE board_comment
    MODIFY COLUMN inserted DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;


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











