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

        const newUser = await db.query (
            "INSERT INTO users (first_name, last_name, email, image) VALUES ($1, $2, $3, $4) RETURNING *", [first_name, last_name, email, image]
        );

        res.json(newUser.rows[0])
        
    } catch (error) {
        console.error(error.message)
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




app.listen(PORT, () => console.log(`HELLOO! Server running on Port http://localhost:${PORT}`));