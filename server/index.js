//@59:17 in video https://www.youtube.com/watch?v=ldYcgPKEZC8
const express = require('express');
const cors = require('cors');
const app = express();

//connection to the database which allows us to connect to our DB
const pool = require('./db');

//middleware
app.use(cors());
//allows us to get access to request.body
app.use(express.json());

//ROUTES
//create a todo
app.post("/todos", async(req,res)=>{
    try {
        const { description } = req.body;
        //the $1 references the second parameter [description] this is similar as using ${x} in a template string
        //the returning keyword will return the data being added, updated, or deleted
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        //the rows contain the data being updated, added, and deleted
        res.json(newTodo.rows);
    } catch (err) {
        console.log(err);
    }
});

//get all todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        //we dont need to say returning * because we are already selecting all todos
        res.json(allTodos.rows);
    } catch(err){
        console.log(err);
    }
})

//get a todo
app.get("/todos/:id",async (req, res) => {
    try {
        //here we take from params and not body since we are parsing part of the url
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        //we use the rows[0] to indicate that we want the first item from that array
        res.json(todo.rows[0]);
    } catch(err) {
        console.log(err);
    }
})

//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("Todo was updated!");
    } catch(err) {
        console.log(err);
    }
});

//delete a todo
app.delete("/todos/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted!");
    } catch(err) {
        console.log(err);
    }
})

// listener

app.listen(5000, () => {
    console.log("server has started on port 5000");
});