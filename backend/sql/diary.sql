CREATE TABLE diary
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    title     VARCHAR(100)  NOT NULL,
    content   VARCHAR(1000) NOT NULL,
    inserted  DATETIME      NOT NULL DEFAULT NOW(),
    member_id INT           NOT NULL REFERENCES member (id),
    nickname  VARCHAR(255)  NOT NULL REFERENCES member (nickname)
);
INSERT INTO diary
    (title, content, member_id)
SELECT title, content, member_id
FROM diary;

SELECT COUNT(*)
FROM diary;

SHOW CREATE TABLE diaryComment;
START TRANSACTION;

SELECT *
FROM diary;
-- 외부 키 제약 조건 제거
ALTER TABLE diaryComment
    DROP FOREIGN KEY fk_diaryMemberId;

-- 컬럼 이름 변경
ALTER TABLE diaryComment
    CHANGE memberId member_id INT;
ALTER TABLE diary
    DROP COLUMN writer;

UPDATE diary
SET member_id = (SELECT id FROM member ORDER BY id DESC LIMIT 1)
WHERE id > 0;

SELECT *
FROM diary;

-- 외부 키 제약 조건 다시 추가 (새로운 이름으로)
ALTER TABLE diaryComment
    ADD CONSTRAINT fk_diaryComment_memberId FOREIGN KEY (member_id) REFERENCES member (id);

COMMIT;


-- 컬럼 이름 변경
ALTER TABLE diaryComment
    CHANGE member_id memberId INT;

-- 외부 키 제약 조건 다시 추가
ALTER TABLE diaryComment
    ADD CONSTRAINT fk_diaryMemberId FOREIGN KEY (memberId) REFERENCES member (id);


CREATE TABLE diaryComment
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    comment   VARCHAR(1000) NOT NULL,
    inserted  DATETIME      NOT NULL DEFAULT NOW(),
    member_id INT           NOT NULL REFERENCES member (id),
    nickname  VARCHAR(255)  NOT NULL REFERENCES member (nickname)
);

SELECT *
FROM diary;

ALTER TABLE diary
    DROP COLUMN writer;


ALTER TABLE diary
    ADD COLUMN writer VARCHAR(100) NOT NULL AFTER content;


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



DROP TABLE diaryComment;

SELECT *
FROM diary
WHERE id = 1;

DESC diary;

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

