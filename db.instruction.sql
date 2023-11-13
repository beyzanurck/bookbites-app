--
-- PostgreSQL database dump
--

-- Open your terminal

-- Run psql
psql

-- Create DB
CREATE DATABASE bookbites;

-- View all databases
\l

-- Quit current db
\q

-- Connect to the project db
psql bookbites;

-- Create tables
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    image VARCHAR(500),
    auth0_sub VARCHAR(255)
);

CREATE TABLE feeds (
    feed_id SERIAL PRIMARY KEY,
    api_id VARCHAR(255) NOT NULL,
    user_id INT REFERENCES users(user_id),
    isFavorite BOOLEAN DEFAULT FALSE,
    shelf_status INT CHECK (shelf_status IN (0, 1, 2)),
    note TEXT,
    isnoteprivate BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    api_id VARCHAR(255),
    text TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    rate FLOAT CHECK (rate >= 0 AND rate <= 5)
);

-- View all tables
\dt

-- View all  attributes
\d tablename


--
-- PostgreSQL database dump complete
--