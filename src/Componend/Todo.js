import React, { useEffect, useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectTodos, setselectTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  // fetch api
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.slice(0, 5));
      })
      .catch((error) => console.error("Error data", error));
  }, []);

  // localStorage setup
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // New todo add list
  const handleAdd = () => {
    if (newTodo.trim() !== "") {
      const newTodoObj = {
        userId: 1,
        title: newTodo,
        completed: false,
      };

      setTodos([...todos, newTodoObj]);
      setNewTodo("");
    }
  };
  // delete button
  const handleDelete = (index) => {
    console.log(index);
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };
  // Selected checkbox
  const handleCheckboxChange = (index) => {
    const updatedselectTodo = [...selectTodos];
    if (updatedselectTodo.includes(index)) {
      updatedselectTodo.splice(updatedselectTodo.indexOf(index), 1);
    } else {
      updatedselectTodo.push(index);
    }
    setselectTodos(updatedselectTodo);
  };

  // Selected delete button
  const DeleteSelected = () => {
    const updatedTodos = todos.filter(
      (_, index) => !selectTodos.includes(index)
    );
    setTodos(updatedTodos);
    setselectTodos([]);
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTitle(todos[index].title);
  };

  // Save edited title
  const handleSaveEdit = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].title = editedTitle;
    setTodos(updatedTodos);
    setEditIndex(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  return (
    <div className="App container ">
      <h1> To-Do List App</h1>
      <input
        className="input"
        type="text"
        value={newTodo}
        placeholder="Enter a New Todo List :"
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className="button" onClick={handleAdd}>
        Add Todo
      </button>
      <button className="button" onClick={DeleteSelected}>
        Delete Selected
      </button>
      <ul>
        {todos.map((todo, index) => (
          <table
            className={`table ${todo.completed ? "completed" : ""}`}
            key={index}
          >
            <thead className="th">
              <tr className="tr">
                <th className="td">Number</th>
                <th className="title">Title</th>
                <th className="checkbox">Selected</th>
                <th className="editTh">Edit</th>
                <th className="thButton">Deleted</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tr">
                <td className="td">{index + 1}</td>
                <td className="title">
                  {editIndex === index ? (
                    <div>
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                      <button
                        className="button"
                        onClick={() => handleSaveEdit(index)}
                      >
                        Save
                      </button>
                      <button className="button" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    todo.title
                  )}
                </td>
                <td className="checkbox">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={selectTodos.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td className="leftButton">
                  {editIndex === index ? (
                    ""
                  ) : (
                    <button
                      className="button edit "
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    className="buttonDelete"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
