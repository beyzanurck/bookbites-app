import express from 'express';
import 'dotenv/config'
import db from "./db/db-connection.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';


const app = express();

app.use(cors());
app.use(express.json());

// Needed it for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the path to the React application's build directory. This assumes that the production-ready frontend code
// is located in the 'client/dist' directory, which is a common convention for React applications.
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'dist');

// Serve the static files from the React build directory. This middleware enables the Express server to
// serve the optimized, production build of the React app, including HTML, CSS, JavaScript, and any other static assets.
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;

// serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
});


//displays all users
app.get("/api/users", async (req, res) =>  {

    try {
        const {rows : users} = await db.query('SELECT * FROM users');
        res.status(200).json(users); // OK

    } catch (error) {
        console.error("Error Message!:", error.message);
        res.status(500).json({ message: error.message });
    }

});


//displays specific user
app.get('/api/users/:id', async (req, res) =>{

    try{
        const { id } = req.params;
        const user = await db.query("SELECT * FROM users WHERE user_id = $1",  [id]
        );
    
        if (user.rows.length === 0) {
            res.status(404).json({ message: "User not found" }); 
        } else {
            // User found
            res.status(200).json(user.rows[0]); // OK
        }

    } catch(error){
        console.error("Error Message!:", error.message);
        res.status(500).json({ message: error.message });
    }    
})


//adds a new user
app.post("/api/users", async (req, res) =>  {
    
    try {
        const {first_name, last_name, email, image, auth0_sub } = req.body;

        // checks if the user with this email already exists - otherwise server throws an error bc the email has UNIQUE.
        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0) {
            
            if (image === undefined || image === null) {
                console.log("image is empty")
            } else {
                const updatedUser = await db.query(
                    "UPDATE users SET image = $1 WHERE email = $2 RETURNING *",
                    [image, email]
                );
                res.status(200).json(updatedUser.rows[0]);
            }
            return; 
            // return res.status(409).json({ status: "user_exists", message: "User already exists!" }); // returns 409 conflict status if the user already exists.
        }

        // If not, insert the new user
        const newUser = await db.query(
            "INSERT INTO users (first_name, last_name, email, image, auth0_sub) VALUES ($1, $2, $3, $4, $5) RETURNING *", [first_name, last_name, email, image, auth0_sub]
        );

        res.status(201).json(newUser.rows[0]);
        
    } catch (error) {
        console.error("Error Message:", error.message);
        res.status(500).json({ message: error.message });
    }
});


//displays all books
app.get("/api/books", async (req, res) =>  {
    
    try {
        const urls = [
            'https://www.googleapis.com/books/v1/volumes?q=subject:science+fiction&startIndex=3&maxResults=12',
            'https://www.googleapis.com/books/v1/volumes?q=subject:cookbooks&maxResults=8',
            'https://www.googleapis.com/books/v1/volumes?q=subject:manga&maxResults=8',
            'https://www.googleapis.com/books/v1/volumes?q=subject:history&maxResults=8'
        ];

        const fetchBookData = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data.items || [];
        };

        const allBookRequests = urls.map(url => fetchBookData(url));
        const allBooksResults = await Promise.all(allBookRequests);

        const demo_books = allBooksResults.flat();
        res.status(200).json(demo_books);

    } catch (error) {
        console.error("Error Message!:", error.message);
        res.status(500).json({ message: error.message });
    }

});


//displays specific books
app.get("/api/:id", async (req, res) =>  {

    try {
        const { id } = req.params;

        const url = `https://www.googleapis.com/books/v1/volumes/${id}`

        const response = await fetch(url);
        const data = await response.json();
        const book = data; 

        if (book.length === 0) {
            res.status(404).json({ message: "Book not found" });
        } else {
            res.status(200).json(book);
        }

    } catch (error) {
        console.error("Error Message!:", error.message);
        res.status(500).json({ message: error.message });
    }

});


//finds the user id based on the auth0_sub
async function getUserIdFromSub(userSub) {

    const user = await db.query(
        'SELECT user_id FROM users WHERE auth0_sub = $1',
         [userSub]
    );
    
    return user.rows[0].user_id;
}


//update and add feed events
app.post("/api/feed", async (req, res) =>  {
    
    try {
        
        let {auth0_sub, api_id, isFav, shelf_status } = req.body;

        let user_id = await getUserIdFromSub(auth0_sub)

        const existingEntry = await db.query("SELECT * FROM feeds WHERE api_id = $1 AND user_id = $2", [api_id, user_id]);

        if (existingEntry.rows.length > 0) {

            if (shelf_status === undefined) {
                shelf_status = existingEntry.rows[0].shelf_status;
            }

            const updatedBook = await db.query(
                "UPDATE feeds SET isFavorite = $1, shelf_status = $2 WHERE api_id = $3 AND user_id = $4 RETURNING *",
                [isFav, shelf_status, api_id, user_id]
            );
            
            res.status(200).json(updatedBook.rows[0]);
        }
        else {
            const newItem = await db.query(
                "INSERT INTO feeds (api_id, user_id, isfavorite, shelf_status, note) VALUES ($1, $2, $3, $4, $5) RETURNING *", [api_id, user_id, isFav, shelf_status, null]
            );

            // Send back the new feed entry with a 201 Created status
            res.status(201).json(newItem.rows[0]);
        }

    } catch (error) {
        console.error("Error Message!:", error.message);
        res.status(500).json({ message: error.message });
    }

});


//queries for the user's all actions
app.get("/api/feed/:id", async (req, res) =>  {
    
    try {
        const { id } = req.params;

        let user_id = await getUserIdFromSub(id)
        const {rows : user_actions} = await db.query('SELECT * FROM feeds WHERE user_id = $1', [user_id]);

        if (user_actions.length === 0) {
            res.status(200).json([]); 
        } 
        else {
            res.status(200).json(user_actions);
        }
        
    } catch (error) {
        console.error("Error Message!:", error.message);
        res.status(500).json({ message: error.message });
    }

});


//queries for the user's action
app.get("/api/feed/:id/:apiId", async (req, res) =>  {
    
    try {
        const { id, apiId } = req.params;

        let user_id = await getUserIdFromSub(id)
        const {rows : user_action} = await db.query('SELECT * FROM feeds WHERE user_id = $1 AND api_id = $2', [user_id, apiId]);
    
        if (user_action.length === 0) {
            
            res.status(404).json({ message: "User action not found" });
        } else {
            res.status(200).json(user_action);
        }
        
    } catch (error) {
        console.error("Error Message!:", error.message);
        res.status(500).json({ message: error.message });
    }

});


//add a new comment on Book Page
app.post("/api/comment", async (req, res) =>  {

    try {

        const {auth0_sub, api_id, text, date, rate } = req.body;

        let user_id = await getUserIdFromSub(auth0_sub)

        const { rows: comment } = await db.query("INSERT INTO comments (user_id, api_id, text, date, rate) VALUES ($1, $2, $3, $4, $5) RETURNING *", [user_id, api_id, text, date, rate]);

        if (comment.length === 0) {
            res.status(404).json({ message: "Comment not found" });
        } else {
            res.status(200).json(comment);
        }

    } catch (error) {
        console.error("Error Message!:", error.message);
        res.status(500).json({ message: error.message });
    }

});



//gets the book's comments
app.get("/api/comment/:id/:userSub", async (req, res) =>  {
    
    try {
        const { id, userSub } = req.params;
        let loggedInUserId = await getUserIdFromSub(userSub)
        
        const {rows : commentList} = await db.query(`
            SELECT 
                comments.comment_id, 
                comments.text, 
                comments.date, 
                comments.rate, 
                users.first_name, 
                users.last_name,
                users.auth0_sub,
                users.image
            FROM comments 
            JOIN users ON comments.user_id = users.user_id
            WHERE comments.api_id = $1
            ORDER BY 
                CASE WHEN comments.user_id = $2 THEN 0 ELSE 1 END, 
                comments.date DESC
        `, [id, loggedInUserId]);

        if (commentList.length === 0) {
            res.status(200).json([]); 
        } 
        else {
            res.status(200).json(commentList);
        }
        
    } catch (error) {
        console.error("Error Message!:", error.message);
        res.status(500).json({ message: error.message });
    }

});


//delete a comment
app.delete('/api/comment/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deletePost= await db.query("DELETE FROM comments WHERE comment_id = $1", [id]
        );

        res.json({ message: "The comment was deleted!"});

    } catch (error) {
        console.error(error.message)
    }
})


//edit a comment
app.put('/api/comment', async (req, res) => {

    const {text, rate, comment_id } = req.body;

    try {
        const updatedComment = await db.query(
            "UPDATE comments SET text = $1, rate = $2 WHERE comment_id = $3 RETURNING *",
            [ text, rate, comment_id ]
        );

        res.status(200).json(updatedComment.rows[0]);

    } catch (error) {
        console.error("Error Message!:", error.message);
        res.status(500).json({ message: error.message });
    }
})


//gets all info about user's actions
app.get("/api/profile/:id", async (req, res) =>  {
    
    try {
        const { id } = req.params;
        let loggedInUserId = await getUserIdFromSub(id)
        
        const {rows : user_actions} = await db.query(`
            SELECT u.image, u.user_id, f.*, c.*
            FROM feeds f
            JOIN users u ON f.user_id = u.user_id
            LEFT JOIN comments c ON f.user_id = c.user_id AND f.api_id = c.api_id
            WHERE u.user_id = $1`, [loggedInUserId]
        );

        if (user_actions.length === 0) {
            res.status(200).json([]); 
        } 
        else {
            res.status(200).json(user_actions);
        }
        
    } catch (error) {
        console.error("Error Message!:", error.message);
        res.status(500).json({ message: error.message });
    }

});


//adds new note
app.put("/api/note", async (req, res) =>  {

    try {

        const {isNotePrivate, note, feed_id} = req.body;
        
        const { rows: newNote } = await db.query("UPDATE feeds SET isNotePrivate = $1, note = $2 WHERE feed_id = $3 RETURNING *", [isNotePrivate, note, feed_id]);
        
        res.status(200).json(newNote);

    } catch (error) {
        console.error("Error Message!:", error.message);
        res.status(500).json({ message: error.message });
    }

});


app.listen(PORT, () => console.log(`HELLOO! Server running on Port http://localhost:${PORT}`));