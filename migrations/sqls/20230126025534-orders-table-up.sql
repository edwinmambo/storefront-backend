CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  quantity INTEGER,
  user_id INTEGER,
  status_of_order BOOLEAN,
  CONSTRAINT fk_product_id
  FOREIGN KEY (product_id)
  REFERENCES products(id),
  CONSTRAINT fk_user_id
  FOREIGN KEY (user_id)
  REFERENCES users(id)
);