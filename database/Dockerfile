FROM postgres:17
COPY ./tools/create_database.sql /docker-entrypoint-initdb.d/01_create_database.sql
COPY ./tools/add_test.sql /docker-entrypoint-initdb.d/02_add_test.sql