use prj3;

CREATE TABLE profile
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    member_id   INT          NOT NULL,
    file_name   VARCHAR(255) NOT NULL,
    upload_path VARCHAR(255) NOT NULL,
    FOREIGN KEY (member_id) REFERENCES member (id)
);
