USE prj3;

CREATE TABLE hospital
(
    hospital_id INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    address     VARCHAR(255) NOT NULL,
    call_number VARCHAR(255) NOT NULL UNIQUE


);

INSERT INTO hospital(name, address, call_number)
VALUES ('서울 성윤모 병원', '서울특별시 성북구 이대로 111', '02-1111-1111');

# 리뷰 테이블
CREATE TABLE hospital_comment
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    hospital_id INT          NOT NULL,
    member_id   INT          NOT NULL REFERENCES member (id),
    comment     VARCHAR(500) NOT NULL,
    inserted    DATETIME     NOT NULL DEFAULT NOW(),
    nickname    VARCHAR(255) NOT NULL REFERENCES member (nickname)
);


SELECT *
FROM hospital_comment;

DROP TABLE hospital_comment;


INSERT INTO hospital_comment(hospital_id, member_id, comment)
VALUES (1, 22, '여기 병원 정말 좋습니다.');

INSERT INTO hospital_comment(hospital_id, member_id, comment)
VALUES (1, 23, '여기 병원 별로임.');
ALTER TABLE hospital_comment
    ADD username VARCHAR(255) DEFAULT NULL;

DELETE
FROM hospital_comment
WHERE hospital_id = 1;
