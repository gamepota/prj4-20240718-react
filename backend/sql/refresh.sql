use prj3;

CREATE TABLE refresh_token
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    username   VARCHAR(255) NOT NULL,
    refresh    VARCHAR(512) NOT NULL UNIQUE,
    expiration TIMESTAMP    NOT NULL
);
DROP TABLE refresh_token;