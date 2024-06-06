CREATE TABLE diaryBoard
(
    diary_id       INT PRIMARY KEY AUTO_INCREMENT,
    diary_title    VARCHAR(100)  NOT NULL,
    diary_content  VARCHAR(1000) NOT NULL,
    diary_writer   VARCHAR(100)  NOT NULL,
    diary_inserted DATETIME      NOT NULL DEFAULT NOW()
);

SELECT *
FROM diaryBoard;