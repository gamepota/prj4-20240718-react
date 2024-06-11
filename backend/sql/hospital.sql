USE prj3;

CREATE TABLE hospital
(
    hospital_id INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    address     VARCHAR(255) NOT NULL,
    call_number VARCHAR(255) NOT NULL UNIQUE


);
