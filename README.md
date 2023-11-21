# Project Name

## Introduction:

BookBites is an easy-to-use website for people who love books. You can find great books, write reviews, give ratings, and make notes about your readings. You can also share your thoughts with others. It's the perfect tool for anyone who loves to read.

#### Part 1:
![bites1 Demo](/client/public/images/bites1.gif)
#### Part 2:
![bites2 Demo](/client/public/images/bites2.gif)


## Technologies:

| Backend        | Frontend       | Database       | Testing         |
| -------------- | -------------- | -------------- | --------------  |
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | ![Vite](https://img.shields.io/badge/-Vite-646cff?style=flat-square&logo=vite&logoColor=white) | ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white) | ![testing-library/react](https://img.shields.io/badge/-testing--library/react-E33332?style=flat-square&logo=testing-library&logoColor=white)|
| ![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white) | ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white) | ![SQL](https://img.shields.io/badge/-SQL-000000?style=flat-square) | ![Vitest](https://img.shields.io/badge/-Vitest-944058?style=flat-square&logo=vitest&logoColor=white) |
| ![Postman](https://img.shields.io/badge/-Postman-FF6C37?style=flat-square&logo=postman&logoColor=white) |                |                |                  |

## Dependencies:

| Backend        | Frontend       | Database       | Testing         |
| -------------- | -------------- | -------------- | --------------  |
| ![cors](https://img.shields.io/badge/-cors-000000?style=flat-square) | ![react-bootstrap](https://img.shields.io/badge/-react--bootstrap-563D7C?style=flat-square&logo=react-bootstrap&logoColor=white) | ![pg](https://img.shields.io/badge/-pg-336791?style=flat-square&logo=postgresql&logoColor=white) | ![vitest-dom](https://img.shields.io/badge/-vitest--dom-944058?style=flat-square&logo=vitest&logoColor=white) |
| ![dotenv](https://img.shields.io/badge/-dotenv-000000?style=flat-square) | ![bootstrap](https://img.shields.io/badge/-bootstrap-563D7C?style=flat-square&logo=bootstrap&logoColor=white) |                |  |
| ![concurrently](https://img.shields.io/badge/-concurrently-000000?style=flat-square) | ![react-router-dom](https://img.shields.io/badge/-react--router--dom-CA4245?style=flat-square&logo=react-router&logoColor=white) |                |  |
| ![nodemon](https://img.shields.io/badge/-nodemon-76D04B?style=flat-square&logo=nodemon&logoColor=white) |                |                |                  |










[WIREFRAME](https://docs.google.com/document/d/1NmcmOL7xhBAnZpQ8qrA7-AZ5A8HHKMlKz5rg43rStBE/edit#heading=h.pk2anoxkgn7g)

[USER FLOW](https://docs.google.com/document/d/1NmcmOL7xhBAnZpQ8qrA7-AZ5A8HHKMlKz5rg43rStBE/edit#heading=h.2ym2dm87nqoe)

[DB SCHEMA](https://docs.google.com/document/d/1NmcmOL7xhBAnZpQ8qrA7-AZ5A8HHKMlKz5rg43rStBE/edit#heading=h.jk8agzwxywxx)

[TIME MANAGEMENT](https://docs.google.com/document/d/1NmcmOL7xhBAnZpQ8qrA7-AZ5A8HHKMlKz5rg43rStBE/edit#heading=h.bgu51xvagxmv)

#### STRETCH GOALS


- Feed page so that people can see activity on the page
- Users can visit their profile pages
- Users can follow each other
- Users can message each other
- Editing the user’s image


## Project Setup

1. The data for this project can be found in db.sql. If you have PostgreSQL installed on your local machine, you can follow the instructions inside db.instruction.sql to set up the database.

2. Go to your source directory in your terminal and run the command: `git clone https://github.com/beyzanurck/bookbites-app.git`.

3. Go to the project folder (`cd bookbites-app`) and clean owner's git: `rm -rf .git`.

4. Go to the server folder in the project (`cd server`) and run the command `npm install`.

5. Go to the client folder (`cd .. and cd client`) and run the command `npm install`.

6. Go to the server folder in the project (`cd server`) and run the command `touch .env`.

7. Place `DB_URL="postgresql://localhost/bookbites" PORT=1212` inside .env.

8. While you are in the sever folder, run the command `npm run dev` to start both servers.

9. Go to the client folder (`cd .. and cd client`) and run the command `npm run build`. You need to run this command every time you make a change.

10. Open your web browser and visit `http://localhost:1212`.