# Project Name

### Technologies: 

| Backend 	| Frontend 	| Database   	| Testing   	|
|---------	|----------	|------------	|-----------	|
| Node    	| Vite     	| PostgreSQL 	| RTL       	|
| Express 	| React    	| SQL        	| Vitest    	|
| Postman 	|     	    |         	    |       	    |


### Dependencies: 

| Backend      	| Frontend        	| Database 	| Testing                   	|
|--------------	|-----------------	|----------	|---------------------------	|
| cors         	| react-bootstrap 	| pg       	| @testing-library/react    	|
| dotenv       	| bootstrap       	|          	| @testing-library/jest-dom 	|
| concurrently 	| react-router-dom 	|          	| vitest-dom                	|
| nodemon      	|                 	|          	|                           	|
 

### Introduction:

BookBites is an easy-to-use website for people who love books. You can find great books, write reviews, give ratings, and make notes about your readings. You can also share your thoughts with others. It's the perfect tool for anyone who loves to read.

[WIREFRAME](https://docs.google.com/document/d/1NmcmOL7xhBAnZpQ8qrA7-AZ5A8HHKMlKz5rg43rStBE/edit#heading=h.pk2anoxkgn7g)

[USER FLOW](https://docs.google.com/document/d/1NmcmOL7xhBAnZpQ8qrA7-AZ5A8HHKMlKz5rg43rStBE/edit#heading=h.2ym2dm87nqoe)

[DB SCHEMA](https://docs.google.com/document/d/1NmcmOL7xhBAnZpQ8qrA7-AZ5A8HHKMlKz5rg43rStBE/edit#heading=h.jk8agzwxywxx)


## Project Setup

1. The data for this project can be found in db.sql. If you have PostgreSQL installed on your local machine, you can follow the instructions inside db.sql to set up the database.

2. Go to your source directory in your terminal and run the command: `git clone xxx`.

3. Go to the project folder (`cd xx`) and clean owner's git: `rm -rf .git`.

4. Go to the server folder in the project (`cd server`) and run the command `npm install`.

5. Go to the client folder (`cd .. and cd client`) and run the command `npm install`.

6. Go to the server folder in the project (`cd server`) and run the command `touch .env`.

7. Place `DB_URL="postgresql://localhost/dbname"` inside .env.

8. While you are in the sever folder, run the command `npm run dev` to start both servers.

9. Open your web browser and visit `http://localhost:1212` and `http://localhost:5173`.