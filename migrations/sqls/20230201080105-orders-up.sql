CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  status_of_order VARCHAR(10) NOT NULL DEFAULT 'active',
  CONSTRAINT fk_orders_users
    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);