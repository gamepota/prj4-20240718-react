CREATE TABLE diary
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    title     VARCHAR(100)  NOT NULL,
    content   VARCHAR(1000) NOT NULL,
    writer    VARCHAR(100)  NOT NULL,
    inserted  DATETIME      NOT NULL DEFAULT NOW(),
    memberId  INT           NOT NULL REFERENCES member (id),
    nick_name VARCHAR(255)  NOT NULL REFERENCES member (nickname)
);

DROP TABLE diary;

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
    board_id  INT          NOT NULL REFERENCES board (id),
    member_id INT          NOT NULL REFERENCES member (id),
    comment   VARCHAR(500) NOT NULL,
    inserted  DATETIME     NOT NULL DEFAULT NOW()
);

SELECT *
FROM diaryComment;