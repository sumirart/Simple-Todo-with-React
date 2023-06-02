import { useEffect, useState } from "react";

import Input from "./components/Input";
import TodosWrapper from "./components/TodosWrapper";
import randomize from "./utils/randomize";

const ip = `${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/`;

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState(undefined);

  useEffect(() => {
    fetch(`${ip}todos`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTodos(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // if we want to control the input
  function handleChangeTodoInput(e) {
    setTodo(e.target.value);
  }

  function handleToggle(id) {
    const newTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });

    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    e.preventDefault();

    const newTodo = {
      todo,
      isCompleted: false,
    };

    fetch(`${ip}todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((result) => {
        setTodos([...todos, result]);
        setTodo("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteTodo(id) {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  }

  function handleEditedTodo(todo) {
    setTodo(todo.todo);
    setEditedTodo(todo);
  }

  function handleCancelEditTodo() {
    setTodo("");
    setEditedTodo(undefined);
  }

  function handleSaveEditTodo(e) {
    e.preventDefault();

    const newTodos = todos.map((item) => {
      if (item.id === editedTodo.id) {
        return { ...item, todo };
      }
      return item;
    });
    setTodos(newTodos);

    setTodo("");
    setEditedTodo(undefined);
  }

  return (
    <div className="App">
      <header>
        <h1 className="mb-8 text-center text-3xl font-bold">Simple Todo</h1>
      </header>
      <Input
        handleAddTodo={handleAddTodo}
        handleChangeTodoInput={handleChangeTodoInput}
        todo={todo}
        editedTodo={editedTodo}
        handleSaveEditTodo={handleSaveEditTodo}
        handleCancelEditTodo={handleCancelEditTodo}
      />
      <TodosWrapper
        todos={todos}
        handleToggle={handleToggle}
        handleDeleteTodo={handleDeleteTodo}
        handleEditedTodo={handleEditedTodo}
        className="mt-12"
      />
    </div>
  );
}

export default App;
