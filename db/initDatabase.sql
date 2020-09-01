DROP TABLE "Users";

CREATE TABLE "Users" (
    id VARCHAR PRIMARY KEY NOT NULL,
    login VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    age INTEGER NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE
);

INSERT INTO "Users" (id, login, password, age)
VALUES
    ('1', 'DenisSid1', '123qwe', 100),
    ('2', 'DenisSid2', '123qwe', 4),
    ('3', 'DenisSid3', '123qwe', 130);
