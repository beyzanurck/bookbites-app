import express from 'express';
import 'dotenv/config'
import db from "./db/db-connection.js";
import cors from 'cors';

const app = express();
const PORT = 1212;

app.use(cors());
app.use(express.json()); //req.body

//displays all users
app.get("/users", async (req, res) =>  {
    
    try {
        const {rows : users} = await db.query('SELECT * FROM users');
        res.send(users);
    } catch (error) {
        console.error("Error Message!:", error.message);
    }

});

//displays specific user
app.get('/users/:id', async (req, res) =>{

    try{
        const { id } = req.params;
        const user = await db.query("SELECT * FROM users WHERE user_id = $1",  [id]
        );
    
        res.json(user.rows[0]);

    } catch(error){
        console.log(error);
    }    
})

//adds a new user
app.post("/users", async (req, res) =>  {
    
    try {
        const {first_name, last_name, email, image, auth0_sub } = req.body;

        // checks if the user with this email already exists - otherwise server throws an error bc the email has UNIQUE.
        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ status: "user_exists", message: "User already exists!" }); // returns 409 conflict status if the user already exists.
        }

        // If not, insert the new user
        const newUser = await db.query(
            "INSERT INTO users (first_name, last_name, email, image, auth0_sub) VALUES ($1, $2, $3, $4, $5) RETURNING *", [first_name, last_name, email, image, auth0_sub]
        );

        res.json(newUser.rows[0]);
        
    } catch (error) {
        console.error(error.message);
    }
});

//displays all books
app.get("/", async (req, res) =>  {
    
    try {
        const {rows : demo_books} = await db.query('SELECT * FROM demo_api');
        res.send(demo_books);
    } catch (error) {
        console.error("Error Message!:", error.message);
    }

});

////displays specific books
app.get("/:id", async (req, res) =>  {
    
    try {

        const { id } = req.params;
        const {rows: book} = await db.query('SELECT * FROM demo_api WHERE api_id = $1',  [id]);
        res.send(book);

    } catch (error) {
        console.error("Error Message!:", error.message);
    }

});

async function getUserIdFromSub(userSub) {
    const user = await db.query(
        'SELECT user_id FROM users WHERE auth0_sub = $1',
         [userSub]
    );
    
    return user.rows[0].user_id;
}

//displays all books
app.post("/library", async (req, res) =>  {
    
    try {
        console.log(req.body)
        const {auth0_sub, api_id, isFav } = req.body;
        let user_id = await getUserIdFromSub(auth0_sub)
        const newItem = await db.query(
            "INSERT INTO books (api_id, user_id, isfavorite, shelf_status, note) VALUES ($1, $2, $3, $4, $5) RETURNING *", [api_id, user_id, isFav, null, null]
        );
        res.json(newItem.rows[0]);
    } catch (error) {
        console.error("Error Message!:", error.message);
    }

});

app.listen(PORT, () => console.log(`HELLOO! Server running on Port http://localhost:${PORT}`));