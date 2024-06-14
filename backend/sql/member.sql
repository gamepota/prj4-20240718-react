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

ALTER TABLE member
    ADD COLUMN postcode         VARCHAR(20) AFTER address,
    ADD COLUMN main_address     VARCHAR(255) AFTER postcode,
    ADD COLUMN detailed_address VARCHAR(255) AFTER main_address;

UPDATE member
SET postcode         = SUBSTRING(address, 1, LOCATE(' ', address) - 1),
    main_address     = TRIM(SUBSTRING(
            address,
            LOCATE(' ', address) + 1,
            LOCATE(' ', address, LOCATE(' ', address) + 1) - LOCATE(' ', address)
                            )),
    detailed_address = TRIM(SUBSTRING(
            address,
            LOCATE(' ', address, LOCATE(' ', address) + 1) + 1
                            ))
WHERE id = 1;

DELETE
FROM member
WHERE id = 12;

ALTER TABLE member
    DROP COLUMN address;