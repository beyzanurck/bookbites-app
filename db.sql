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
    image VARCHAR(500)
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    api_id VARCHAR(255) NOT NULL,
    user_id INT REFERENCES users(user_id),
    isFavorite BOOLEAN DEFAULT FALSE,
    shelf_status INT CHECK (shelf_status IN (0, 1, 2)),
    note TEXT
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    api_id VARCHAR(255) REFERENCES demo_api(api_id),
    text TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    rate FLOAT CHECK (rate >= 0 AND rate <= 5)
);

CREATE TABLE demo_api (
    demo_api_id SERIAL PRIMARY KEY,
    api_id VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publicationYear INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    categories VARCHAR(255) NOT NULL,
    averageRating FLOAT,
    ratingsCount INT
);

-- View all tables
\dt

-- View all  attributes
\d tablename

-- Insert rows into table
INSERT INTO demo_api (api_id, title, author, publicationYear, image_url, categories, averageRating, ratingsCount) VALUES
('wvqXEAAAQBAJ','Spare', 'Prince Harry', 2023, 'https://books.google.com/books/publisher/content?id=wvqXEAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE732E29sIZHqNHHYYl1hJ27Pc5ilMrFGKJUogaucPjdmjxSzizl-rUnUbrY02iValiVuGwdlQLiUr5v5PiQEKrqsBYnSa7x94CVgRsYIRNbjClEwtNGnJ_gZH5mNjDWt49yP3IAf&source=gbs_api', 'Biography', 5, 1),
('Ayk3EAAAQBAJ','Lessons in Chemistry', 'Bonnie Garmus', 2022, 'https://books.google.com/books/content?id=Ayk3EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Fiction', 4.0, 80),
('vHnZCwAAQBAJ','The Body Keeps the Score', 'Bessel van der Kolk, M.D.', 2014, 'https://books.google.com/books/content?id=T7iJDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Psychology', 4.2, 120),
('XfFvDwAAQBAJ','Atomic Habits', 'James Clear', 2018, 'https://books.google.com/books/content?id=XfFvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Business & Economics', 4.6, 140),
('Sm5AKLXKxHgC','Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', 2015, 'https://books.google.com/books/content?id=Sm5AKLXKxHgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Fiction', 4.5, 107);

-- View the list
SELECT * FROM demo_api;


-- Add a new column to the table
ALTER TABLE demo_api
ADD COLUMN description TEXT;

-- Add values to the description
UPDATE demo_api
SET description = 'This is the first sample description for the API.'
WHERE demo_api_id = 1;

UPDATE demo_api
SET description = 'The second placeholder description.'
WHERE demo_api_id = 2;

UPDATE demo_api
SET description = 'This is another example of an API description.'
WHERE demo_api_id = 3;

UPDATE demo_api
SET description = 'Sample description four goes here.'
WHERE demo_api_id = 4;

UPDATE demo_api
SET description = 'The fifth placeholder sentence is this one.'
WHERE demo_api_id = 5;

-- Add a user to the user table
INSERT INTO users (first_name, last_name, email) VALUES ('Beyza', 'Kilinc', 'beyzanurceylan77@gmail.com');

-- Add a foreign key to the book table
ALTER TABLE book ADD FOREIGN KEY (api_id) REFERENCES demo_api(api_id);

-- Add auth0_sub attribute
ALTER TABLE users ADD COLUMN auth0_sub VARCHAR(255) UNIQUE;


--
-- PostgreSQL database dump complete
--