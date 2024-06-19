CREATE TABLE diary
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    title     VARCHAR(100)  NOT NULL,
    content   VARCHAR(1000) NOT NULL,
    writer    VARCHAR(100)  NOT NULL,
    inserted  DATETIME      NOT NULL DEFAULT NOW(),
    member_id INT           NOT NULL REFERENCES member (id),
    nick_name VARCHAR(255)  NOT NULL REFERENCES member (nickname)
);



ALTER TABLE diary
    ADD COLUMN member_id INT REFERENCES member (id) AFTER inserted;


SELECT *
FROM diary;


SELECT *
FROM diary;

CREATE TABLE test
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    title    VARCHAR(100)  NOT NULL,
    content  VARCHAR(1000) NOT NULL,
    writer   VARCHAR(100)  NOT NULL,
    inserted DATETIME      NOT NULL DEFAULT NOW()
);



INSERT INTO test(id, title, content, writer)
    VALUE ('1', '1', '1', '1');

SELECT *
FROM test;

CREATE TABLE diaryComment
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    diary_id  INT          NOT NULL REFERENCES diary (id),
    member_id INT          NOT NULL REFERENCES member (id),
    comment   VARCHAR(500) NOT NULL,
    inserted  DATETIME     NOT NULL DEFAULT NOW()
);

INSERT INTO diaryComment(member_id, diary_id, comment)
VALUES (1, 1, 'This is a comment');

SELECT *
FROM diary
WHERE id = 1;



DROP TABLE diaryComment;

SELECT *
FROM diaryComment;

CREATE TABLE diary_file
(
    diary_id INT          NOT NULL REFERENCES diary (id),
    name     VARCHAR(500) NOT NULL,
    PRIMARY KEY (diary_id, name)
);

UPDATE diary
SET member_id = 18
WHERE id % 2 = 0;
UPDATE diary
SET member_id = 19
WHERE id % 2 = 1;

UPDATE diary
SET title   = 'abc def',
    content = 'ghi jkl'
WHERE id % 3 = 0;
UPDATE diary
SET title   = 'mno pqr',
    content = 'stu vwx'
WHERE id % 3 = 1;
UPDATE diary
SET title   = 'yz1 234',
    content = '567 890'
WHERE id % 3 = 2;

