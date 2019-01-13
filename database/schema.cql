DROP KEYSPACE IF EXISTS keyspacemarlio;

CREATE KEYSPACE keyspacemarlio WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};

DESCRIBE KEYSPACES;
USE keyspacemarlio;

DROP TABLE IF EXISTS "similars";

CREATE TABLE "similars"( 
  id int,
  title text,
  bed int,
  cost int,
  description text,
  favorite boolean,
  picture text,
  premium boolean,
  rcount int,
  stars int,
  PRIMARY KEY (id,title)
);

