DROP TABLE IF EXISTS "Users";

CREATE TABLE "Users" (
    id VARCHAR PRIMARY KEY NOT NULL,
    login VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    age INTEGER NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE
);

INSERT INTO "Users" (id, login, password, age)
VALUES
    ('1', 'CDenisSid1', '123qwe', 100),
    ('2', 'ADenisSid2', '123qwe', 4),
    ('3', 'BDenisSid3', '123qwe', 130);
