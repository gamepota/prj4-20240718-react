USE prj3;

TRUNCATE TABLE chat_message;

ALTER TABLE chat_message
CHANGE COLUMN sender sender_id INT,
ADD FOREIGN KEY (sender_id) REFERENCES member(id),
CHANGE COLUMN recipient recipient_id INT,
ADD FOREIGN KEY (recipient_id) REFERENCES member(id);

SET FOREIGN_KEY_CHECKS = 1;

TRUNCATE TABLE member;
