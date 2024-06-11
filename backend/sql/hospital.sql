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