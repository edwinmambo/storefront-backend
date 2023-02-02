# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: '/products' [GET]
- Show: '/products/:id' [GET]
- Create [token required]: '/products' [POST]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required] '/users' [GET]
- Show [token required] '/users/:id' [GET]
- Create N[token required] '/users' [POST]

#### Orders

- Current Order by user (args: user id)[token required] '/orders/:user_id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price default 0.00
- [OPTIONAL] category default 'general'

##### Products schema

|         id         |     name     |  price  |  category   |
| :----------------: | :----------: | :-----: | :---------: |
| SERIAL PRIMARY KEY | VARCHAR(100) | NUMERIC | VARCHAR(50) |

#### User

- id
- username
- firstName
- lastName
- password

##### Users schema

|         id         | username |  first_name  |  last_name   | password_digest |
| :----------------: | :------: | :----------: | :----------: | :-------------: |
| SERIAL PRIMARY KEY | VARCHAR  | VARCHAR(100) | VARCHAR(100) |     VARCHAR     |

#### Orders

- id
- user_id
- status of order (active or complete)

##### Orders schema

|         id         |            user_id             | status_of_order |
| :----------------: | :----------------------------: | :-------------: |
| SERIAL PRIMARY KEY | INTEGER (FOREIGN KEY to USERS) |   VARCHAR(10)   |

#### Order Products

- id
- order_id
- product_id id of each product in the order
- quantity of each product in the order

##### Order-products schema

|         id         |            order_id             |            product_id             | quantity |
| :----------------: | :-----------------------------: | :-------------------------------: | :------: |
| SERIAL PRIMARY KEY | INTEGER (FOREIGN KEY to ORDERS) | INTEGER (FOREIGN KEY to PRODUCTS) | INTEGER  |
