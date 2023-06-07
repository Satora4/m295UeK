DROP DATABASE IF EXISTS zeiterfassung;

CREATE DATABASE zeiterfassung;

USE zeiterfassung;

DROP TABLE IF EXISTS category;

CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO
    category (name)
VALUES
    ("Schule"),
    ("Arbeit");

DROP TABLE IF EXISTS entry;

CREATE TABLE entry (
    id INT NOT NULL AUTO_INCREMENT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

INSERT INTO
    entry (start_time, end_time, category_id)
VALUES
    ('2023-06-07 10:00:00', '2023-06-07 12:00:00', 1);
    