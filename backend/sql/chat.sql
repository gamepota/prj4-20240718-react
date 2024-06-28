USE prj3;

TRUNCATE TABLE friends;

ALTER TABLE chat_message
    CHANGE COLUMN sender sender_id INT,
    ADD FOREIGN KEY (sender_id) REFERENCES member (id),
    CHANGE COLUMN recipient recipient_id INT,
    ADD FOREIGN KEY (recipient_id) REFERENCES member (id);

SET FOREIGN_KEY_CHECKS = 1;

TRUNCATE TABLE logged_in;

CREATE TABLE friends
(
    member_nickname VARCHAR(255),
    friend_nickname VARCHAR(255),
    PRIMARY KEY (member_nickname, friend_nickname),
    FOREIGN KEY (member_nickname) REFERENCES member (nickname) ON DELETE CASCADE,
    FOREIGN KEY (friend_nickname) REFERENCES member (nickname) ON DELETE CASCADE
);

ALTER TABLE friends
    ADD FOREIGN KEY (member_id) REFERENCES member (id) ON DELETE CASCADE,
    ADD FOREIGN KEY (friend_id) REFERENCES member (id) ON DELETE CASCADE;

ALTER TABLE friends
CHANGE COLUMN member_username member_nickname VARCHAR(255),
CHANGE COLUMN friend_username friend_nickname VARCHAR(255);

DROP TABLE IF EXISTS friends


CREATE TABLE logged_in
(
    member_nickname   VARCHAR(255),
    logged_in    BOOLEAN,
    logged_in_at TIMESTAMP,
    PRIMARY KEY (member_nickname),
    FOREIGN KEY (member_nickname) REFERENCES member (nickname) ON DELETE CASCADE
);

DROP TABLE logged_in;

INSERT INTO logged_in (member_nickname, logged_in, logged_in_at)
VALUES ('testerkjh', TRUE, NOW());


ALTER TABLE logged_in
    ADD FOREIGN KEY (member_id) REFERENCES member (id) ON DELETE CASCADE;

INSERT INTO friends (``.friends.member_nickname, ``.friends.friend_nickname)
VALUES ('testkjh', 'testerkjh');

DROP TABLE IF EXISTS friends;

CREATE TABLE friends
(
    friends_id INT AUTO_INCREMENT PRIMARY KEY,
    member_nickname VARCHAR(255) NOT NULL ,
    friend_nickname VARCHAR(255) NOT NULL ,
    FOREIGN KEY (member_nickname) REFERENCES member (nickname) ON DELETE CASCADE,
    FOREIGN KEY (friend_nickname) REFERENCES member (nickname) ON DELETE CASCADE
);

desc logged_in;

CREATE TABLE logged_in (
                           member_nickname varchar(255) NOT NULL PRIMARY KEY,
                           logged_in tinyint(1),
                           logged_in_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE friends

CREATE TABLE friends (
                         friends_id INT AUTO_INCREMENT PRIMARY KEY,
                         member_id INT NOT NULL,
                         friend_id INT NOT NULL,
                         member_nickname VARCHAR(255) NOT NULL,
                         friend_nickname VARCHAR(255) NOT NULL,
                         FOREIGN KEY (member_id) REFERENCES member(id),
                         FOREIGN KEY (friend_id) REFERENCES member(id)
);

INSERT INTO prj3.friends
(member_id, friend_id, member_nickname, friend_nickname)
VALUES (34, 28, 'testkjh', 'testerkjh');

INSERT INTO prj3.friends
(member_id, friend_id, member_nickname, friend_nickname)
VALUES (28, 34, 'testerkjh', 'testkjh');

ALTER TABLE friends ADD UNIQUE INDEX unique_member_friend (member_id, friend_id);

