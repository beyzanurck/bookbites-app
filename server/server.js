import express from 'express';
import 'dotenv/config'
import db from "./db/db-connection.js";
import cors from 'cors';

const app = express();
const PORT = 1212;

app.use(cors());
app.use(express.json()); //req.body


app.get("/", async (req, res) =>  {
    
    try {
        const {rows : demo_books} = await db.query('SELECT * FROM demo_api');
        res.send(demo_books);
    } catch (error) {
        console.error("Error Message!:", error.message);
    }

});

app.listen(PORT, () => console.log(`HELLOO! Server running on Port http://localhost:${PORT}`));