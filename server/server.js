import express from 'express';
import 'dotenv/config'
import db from "./db/db-connection.js";
import cors from 'cors';

const app = express();
const PORT = 1212;

app.use(cors());
app.use(express.json()); //req.body

app.get("/users", async (req, res) =>  {
    
    try {
        const {rows : users} = await db.query('SELECT * FROM users');
        res.send(users);
    } catch (error) {
        console.error("Error Message!:", error.message);
    }

});

app.post("/users", async (req, res) =>  {
    
    try {
        const {first_name, last_name, email, image } = req.body;

        // checks if the user with this email already exists - otherwise server throws an error bc the email has UNIQUE.
        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ status: "user_exists", message: "User already exists!" }); // returns 409 conflict status if the user already exists.
        }

        // If not, insert the new user
        const newUser = await db.query(
            "INSERT INTO users (first_name, last_name, email, image) VALUES ($1, $2, $3, $4) RETURNING *", [first_name, last_name, email, image]
        );

        res.json(newUser.rows[0]);
        
    } catch (error) {
        console.error(error.message);
    }
});


app.get("/", async (req, res) =>  {
    
    try {
        const {rows : demo_books} = await db.query('SELECT * FROM demo_api');
        res.send(demo_books);
    } catch (error) {
        console.error("Error Message!:", error.message);
    }

});

app.get("/:id", async (req, res) =>  {
    
    try {

        const { id } = req.params;
        const {rows: book} = await db.query('SELECT * FROM demo_api WHERE api_id = $1',  [id]);
        res.send(book);

    } catch (error) {
        console.error("Error Message!:", error.message);
    }

});


app.get("/users/books", async (req, res) =>  {
    
    try {
        const {rows : user_library} = await db.query('SELECT * FROM books');
        res.send(user_library);
    } catch (error) {
        console.error("Error Message!:", error.message);
    }

});

app.post("/users/books", async (req, res) =>  {
    
    try {
        const {api_id, user_id, isFavorite, shelf_status, note} = req.body;

        const newBook = await db.query (
            "INSERT INTO books (api_id, user_id, isFavorite, shelf_status, note) VALUES ($1, $2, $3, $4, $5) RETURNING *", [api_id, user_id, isFavorite, shelf_status, note]
        );

        res.json(newBook.rows[0])
        
    } catch (error) {
        console.error(error.message)
    }

});

app.put('/users/books/:id', async (req, res) => {

    try {

      const { id } = req.params;

      const {user_id, isFavorite, shelf_status, note} = req.body;

      const updatedBook = await db.query(
        "UPDATE books SET user_id = $1, isFavorite = $2, shelf_status = $3, note = $4 WHERE api_id = $5 RETURNING *",
        [user_id, isFavorite, shelf_status, note, id]
      );

        res.json(updatedBook.rows[0])

    } catch(error){
        console.log(error);
    }  
});

app.listen(PORT, () => console.log(`HELLOO! Server running on Port http://localhost:${PORT}`));