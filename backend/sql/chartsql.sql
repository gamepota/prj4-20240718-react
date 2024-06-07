USE prj3;

CREATE TABLE chat_message
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    sender    VARCHAR(255) NOT NULL,
    recipient VARCHAR(255) NOT NULL,
    content   TEXT         NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE member
(
    id    INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nick_name    VARCHAR(255) NOT NULL,
    gender   VARCHAR(255) NOT NULL,
    birth_date DATETIME NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    family VARCHAR(255) NOT NULL,
    inserted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO member (email, password, nick_name, gender, birth_date, phone_number, family)
VALUES ('1', '1', '1', '1', '2000-01-01 23:59:59', '1', '1');


CREATE TABLE family
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    gender  VARCHAR(255) NOT NULL,
    age  INT NOT NULL,
    species VARCHAR(255) NOT NULL,
    is_neutered BOOLEAN NOT NULL,
    is_vaccinated BOOLEAN,
    description TEXT,
    FOREIGN KEY (id) REFERENCES member(id)
)
