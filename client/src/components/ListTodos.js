import React, { Fragment, useEffect, useState } from "react";
import EditTodo from './EditTodo';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    //delete function
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch(err) {
            console.log(err);
        }
    }

    const getTodos = async () => {
        try {
            //by default fetch makes a GET request
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch(err) {
            console.log(err);
        }
    }

    //useEffect will call the function as long as the render happened
    //adding the [] at the end limits useEffect to only one request
    useEffect(() => {
        getTodos();
    }, []);

    return (
      <Fragment>
        {" "}
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
                <tr key={todo.todo_id}>
                    <td>{todo.description}</td>
                    <td><EditTodo todo={todo}/></td>
                    <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
};

export default ListTodos;
