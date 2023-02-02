CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  password_digest VARCHAR
);