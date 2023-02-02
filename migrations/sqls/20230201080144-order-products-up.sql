CREATE TABLE order_products(
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  CONSTRAINT fk_order_id
    FOREIGN KEY (order_id)
      REFERENCES orders(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  CONSTRAINT fk_product_id
    FOREIGN KEY (product_id)
      REFERENCES products(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);