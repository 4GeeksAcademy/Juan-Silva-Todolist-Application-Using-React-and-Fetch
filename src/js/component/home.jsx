import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const removeItem = (taskId) => {
    const newTodos = todos.filter((t, index) => index !== taskId);
    setTodos(newTodos);
  };

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/jsilva")
      .then((r) => r.json())
      .then((data) => setTodos(data));
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
                setTodos([...todos, inputValue.trim()]);
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
                removeItem(index);
              }}
            ></button>
          </li>
        ))}
        <div className="text-muted"><small>{todos.length} items</small></div>
      </ul>
    </div>
  );
};

export default Home;
