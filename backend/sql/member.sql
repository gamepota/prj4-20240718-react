use prj3;

CREATE TABLE member
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NOT NULL UNIQUE,
    nickname     VARCHAR(255) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    gender       VARCHAR(255) NOT NULL,
    nationality  VARCHAR(255) NOT NULL,
    birth_date   DATE         NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    address      VARCHAR(255) NOT NULL,
    inserted     DATETIME     NOT NULL DEFAULT NOW()
);