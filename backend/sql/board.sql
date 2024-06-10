USE prj3;

CREATE TABLE board
(
    board_id INT PRIMARY KEY AUTO_INCREMENT,
    title    VARCHAR(100)  NOT NULL,
    content  VARCHAR(1000) NOT NULL,
    writer   VARCHAR(100)  NOT NULL,
    inserted DATETIME      NOT NULL DEFAULT NOW()
);
SELECT *
FROM board;

ALTER TABLE board
    CHANGE id board_id INT AUTO_INCREMENT;

INSERT INTO board(title, content, writer)
SELECT title, content, writer
FROM board;

SELECT COUNT(*)
FROM board;











