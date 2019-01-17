USE keyspacemarlio;

COPY "similars" FROM '../datacass/heck0.csv' WITH DELIMITER = ',' AND HEADER = TRUE;

