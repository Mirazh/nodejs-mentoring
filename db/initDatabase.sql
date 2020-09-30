DROP TABLE IF EXISTS "Users";
CREATE TABLE "Users" (
    id UUID PRIMARY KEY NOT NULL,
    login VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    age INTEGER NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE
);
INSERT INTO "Users" (id, login, password, age)
VALUES
    ('01b7587c-fa72-11ea-adc1-0242ac120002', 'CDenisSid1', '123qwe', 100),
    ('01b75c14-fa72-11ea-adc1-0242ac120002', 'ADenisSid2', '123qwe', 4),
    ('01b75d22-fa72-11ea-adc1-0242ac120002', 'BDenisSid3', '123qwe', 130);

-------------------------------------------------

DROP TABLE IF EXISTS "Users";
CREATE TABLE "Groups" (
    id UUID PRIMARY KEY NOT NULL,
    name VARCHAR UNIQUE NOT NULL,
    permissions VARCHAR[] NOT NULL
);
INSERT INTO "Groups" (id, name, permissions)
VALUES
    ('83499fc6-fa72-11ea-adc1-0242ac120002', 'React', '{READ}'),
    ('8349a30e-fa72-11ea-adc1-0242ac120002', 'NodeJS', '{READ, WRITE}')

-------------------------------------------------
