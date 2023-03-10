# Storefront Backend Project

## Introduction

This repo contains a storefront backend api that connects to the database for communication with the frontend. The API needs are stated in `REQUIREMENTS.md`

## Required Technologies

This application makes use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Setup

1. ### Get the project locally

   Clone the project here on github

   ```bash
   git clone https://github.com/edwinmambo/storefront-backend.git
   ```

2. ### Satisfy the following prerequisites

   - Have docker installed

   ```bash
   #check if docker and docker compose are installed
   docker version
   docker compose version
   ```

   - I use `yarn` as the package manager
   - create an `.env` in file with the following variables:

   ```text
   POSTGRES_HOST
   POSTGRES_DB
   POSTGRES_TEST_DB
   POSTGRES_USER
   POSTGRES_PASSWORD
   ENV
   BCRYPT_PASSWORD
   SALT_ROUNDS
   TOKEN_SECRET
   ```

   The default values I use are the following:

   - host: 127.0.0.1
   - db: full_stack_dev
   - test db: full_stack_dev_test
   - user: full_stack_user
   - password: password123
   - env: dev

   **NOTE:** bcrypt password, salt rounds and token secret are of your own choosing.

3. ### Install the dependencies

   ```bash
   npm install --global yarn
   yarn
   ```

4. ### Set up db

   For both the dev and test environments:

   Run the container from `docker-compose.yml`

   ```bash
   # runs on port 5432
   docker compose up
   ```

   Connect to the container and run the following to setup the database (_Use values in your `.env` file_):

   **Create a user**

   ```bash(psql)
   CREATE USER full_stack_user WITH PASSWORD 'Password123';
   ```

   **Create Databases**

   ```bash(psql)
   CREATE DATABASE full_stack_dev;
   CREATE DATABASE full_stack_dev_test;
   ```

   **Grant all privileges on both databases to user**

   ```bash(psql)
   GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;
   GRANT ALL PRIVILEGES ON DATABASE full_stack_dev_test TO full_stack_user;
   ```

5. ### Run the api

   ```bash
   # In a separate terminal
   yarn watch
   ```

6. ### Testing

   ```bash
   yarn test
   ```

## Usage

The server will run on `localhost:3000/` or `0.0.0.0:3000` where the api will be under the specific endpoint as in `REQUIREMENTS.md`

## Examples

Products: &nbsp; `http:localhost:3000/products`

Users: &emsp; `http:localhost:3000/users`

Orders: &emsp; `http:localhost:3000/orders`
