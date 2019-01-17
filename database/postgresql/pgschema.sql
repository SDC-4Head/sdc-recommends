DROP DATABASE IF EXISTS dbmarlio;

DROP USER IF EXISTS marios;

CREATE USER marios;
CREATE DATABASE dbmarlio;

\c dbmarlio;

DROP TABLE IF EXISTS similars;
CREATE TABLE similars
(
  room_id serial primary key,
  room_name text not null,
  bed int not null,
  cost int not null,
  description text not null,
  favorite boolean not null,
  picture text not null,
  premium boolean not null,
  rcount int not null,
  stars int not null,
  title text not null
);
CREATE INDEX id_idx ON similars (room_id);
CREATE INDEX room_name_idx ON similars (room_name);

COPY similars FROM '/Users/ykmmui/Desktop/code/learn-silo/hack-reactor/SDC/Hrsf107-fec-emai-mod/database/datapostgre/heck0.csv' DELIMITER ',' CSV HEADER;
COPY similars FROM '/Users/ykmmui/Desktop/code/learn-silo/hack-reactor/SDC/Hrsf107-fec-emai-mod/database/datapostgre/heck1.csv' DELIMITER ',' CSV HEADER;
COPY similars FROM '/Users/ykmmui/Desktop/code/learn-silo/hack-reactor/SDC/Hrsf107-fec-emai-mod/database/datapostgre/heck2.csv' DELIMITER ',' CSV HEADER;
COPY similars FROM '/Users/ykmmui/Desktop/code/learn-silo/hack-reactor/SDC/Hrsf107-fec-emai-mod/database/datapostgre/heck3.csv' DELIMITER ',' CSV HEADER;
COPY similars FROM '/Users/ykmmui/Desktop/code/learn-silo/hack-reactor/SDC/Hrsf107-fec-emai-mod/database/datapostgre/heck4.csv' DELIMITER ',' CSV HEADER;
COPY similars FROM '/Users/ykmmui/Desktop/code/learn-silo/hack-reactor/SDC/Hrsf107-fec-emai-mod/database/datapostgre/heck5.csv' DELIMITER ',' CSV HEADER;
COPY similars FROM '/Users/ykmmui/Desktop/code/learn-silo/hack-reactor/SDC/Hrsf107-fec-emai-mod/database/datapostgre/heck6.csv' DELIMITER ',' CSV HEADER;

SELECT setval(pg_get_serial_sequence('similars', 'room_id'), coalesce(max(room_id),0) + 1, false)
FROM similars;
