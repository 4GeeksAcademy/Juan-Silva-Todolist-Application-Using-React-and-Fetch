import React, { useState, useEffect } from "react";

const ApiUrl = "https://assets.breatheco.de/apis/fake/todos/user/jsilva";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    fetch(ApiUrl)
      .then((r) => r.json())
      .then((data) => setTodos(data));
  };

  const addTodo = (label) => {
    const newTodos = [...todos, { label, done: false }];
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const removeTodo = (taskId) => {
    const newTodos = todos.filter((t, index) => index !== taskId);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const saveTodos = (todos) => {
    fetch(ApiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todos),
    })
      .then((r) => r.json())
      .then((data) => console.log("Todos saved:", data))
      .catch((error) => console.error("Error saving todos:", error));
  };

  const clearTodos = () => {
    fetch(ApiUrl, { method: "DELETE" })
      .then(() => setTodos([]))
      .catch((error) => console.error("Error clearing todos:", error));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Todos</h1>
      <ul className="list-group list-group-flush shadow p-3 bg-body rounded-0 ">
        <li className="list-group-item">
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.trim() !== "") {
                addTodo(inputValue.trim());
                setInputValue("");
              }
            }}
            placeholder="What do you need to do?"
          />
        </li>
        {todos.map((t, index) => (
          <li className="list-group-item  d-flex justify-content-between" key={index}>
            <span>{t.label}</span>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={(e) => {
                removeTodo(index);
              }}
            ></button>
          </li>
        ))}
        <div className="text-muted"><small>{todos.length} items</small></div>
      </ul>
      <div className="d-grid gap-2 my-3">
        <button
          type="button"
          className="btn btn-danger"
          onClick={clearTodos}
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default Home;
