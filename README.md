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

![react](https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png)
![vite] (https://github.com/marwin1991/profile-technology-icons/assets/62091613/b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35)
![node] (https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png)
![express] (https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png)
![PostgreSQL] (https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png)
![Postman] (https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png)
![Vitest] (https://github.com/vitest-dev/vitest/blob/main/docs/public/logo.svg)


![bites1 Demo](bites1.gif)
![bites2 Demo](bites2.gif)




### Introduction:

BookBites is an easy-to-use website for people who love books. You can find great books, write reviews, give ratings, and make notes about your readings. You can also share your thoughts with others. It's the perfect tool for anyone who loves to read.

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