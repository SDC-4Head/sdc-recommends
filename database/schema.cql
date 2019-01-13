DROP KEYSPACE IF EXISTS keyspacemarlio;
CREATE KEYSPACE keyspacemarlio WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};

DESCRIBE KEYSPACES;
USE keyspacemarlio;

DROP TABLE IF EXISTS "similars";

CREATE TABLE "similars"( 
  category_id int,
  clustering_id int,
  title text,
  bed int,
  cost int,
  description text,
  favorite boolean,
  picture text,
  premium boolean,
  rcount int,
  stars int,
  PRIMARY KEY (category_id, clustering_id)
) 
WITH CLUSTERING ORDER BY (clustering_id DESC);
CREATE INDEX similars_clustering_id_index ON similars (clustering_id);
