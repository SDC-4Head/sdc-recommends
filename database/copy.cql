USE keyspacemarlio;

COPY "similars" FROM 'data/beta0.csv' WITH DELIMITER = ',' AND HEADER = TRUE;

