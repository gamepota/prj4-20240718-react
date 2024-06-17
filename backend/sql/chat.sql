USE prj3;

TRUNCATE TABLE chat_message;

ALTER TABLE chat_message
    CHANGE COLUMN sender sender_id INT,
    ADD FOREIGN KEY (sender_id) REFERENCES member (id),
    CHANGE COLUMN recipient recipient_id INT,
    ADD FOREIGN KEY (recipient_id) REFERENCES member (id);

SET FOREIGN_KEY_CHECKS = 1;

TRUNCATE TABLE member;

CREATE TABLE friends
(
    member_id INT,
    friend_id INT,
    PRIMARY KEY (member_id, friend_id),
    FOREIGN KEY (member_id) REFERENCES member (id)
    FOREIGN KEY (friend_id) REFERENCES member (id)
);

ALTER TABLE friends
    ADD FOREIGN KEY (member_id) REFERENCES member (id) ON DELETE CASCADE,
    ADD FOREIGN KEY (friend_id) REFERENCES member (id) ON DELETE CASCADE;

CREATE TABLE logged_in
(
    member_id    INT,
    logged_in    BOOLEAN,
    logged_in_at TIMESTAMP,
    PRIMARY KEY (member_id),
    FOREIGN KEY (member_id) REFERENCES member (id) ON DELETE CASCADE
);