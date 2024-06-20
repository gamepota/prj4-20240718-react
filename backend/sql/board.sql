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


UPDATE board
SET board_type='free'
WHERE board_type IS NULL;


UPDATE board
SET board_type='picture'
WHERE id % 2 = 0;

UPDATE board
SET board_type='health'
WHERE id % 3 = 0;

UPDATE board
SET board_type='qna'
WHERE id % 7 = 0;

UPDATE board
SET board_type='training'
WHERE id % 11 = 0;

UPDATE board
SET board_type='review'
WHERE id % 13 = 0;

UPDATE board
SET board_type='meeting'
WHERE id % 17 = 0;


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











