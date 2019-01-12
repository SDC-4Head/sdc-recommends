USE keyspacemarlio;

COPY "similars" FROM 'data/beta1.csv' WITH DELIMITER = ',' AND HEADER = TRUE;

