import { useEffect, useState } from "react";

import Input from "../components/Input";
import TodosWrapper from "../components/TodosWrapper";

const ip = `${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/`;

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState(undefined);

  useEffect(() => {
    fetch(`${ip}todos`)
      .then((res) => res.json())
      .then((result) => {
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

  function handleToggle(id, isCompleted) {
    fetch(`${ip}todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted: !isCompleted }),
    })
      .then((res) => res.json())
      .then((result) => {
        return todos.map((item) => {
          if (item.id === result.id) {
            return result;
          }
          return item;
        });
      })
      .then((result) => {
        setTodos(result);
      })
      .catch((err) => {
        console.log(err);
      });
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
    fetch(`${ip}todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        return todos.filter((item) => item.id !== id);
      })
      .then((result) => setTodos(result))
      .catch((err) => {
        console.log(err);
      });
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

    fetch(`${ip}todos/${editedTodo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...editedTodo, todo }),
    })
      .then((res) => res.json())
      .then((result) => {
        return todos.map((item) => {
          if (item.id === result.id) {
            return result;
          }
          return item;
        });
      })
      .then((result) => {
        setTodos(result);
        setTodo("");
        setEditedTodo(undefined);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h1 className="mb-8 text-center text-3xl font-bold">Simple Todo</h1>
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
    </>
  );
}

export default Todo;
