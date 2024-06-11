USE prj3;

CREATE TABLE board
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    title    VARCHAR(100)  NOT NULL,
    content  VARCHAR(1000) NOT NULL,
    writer   VARCHAR(100)  NOT NULL,
    inserted DATETIME      NOT NULL DEFAULT NOW()
);
SELECT *
FROM board;
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











