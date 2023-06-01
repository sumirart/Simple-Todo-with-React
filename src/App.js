import { useState } from "react";

import Input from "./components/Input";
import TodosWrapper from "./components/TodosWrapper";
import randomize from "./utils/randomize";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(""); // can have another state to control the text input

  function handleAddTodo(e) {
    e.preventDefault();

    const id = randomize();
    const newTodo = {
      id,
      todo,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setTodo("");
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

  function handleDeleteTodo(id) {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  }

  // if we want to control the input
  function handleChangeTodoInput(e) {
    setTodo(e.target.value);
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
      />
      <TodosWrapper
        todos={todos}
        handleToggle={handleToggle}
        handleDeleteTodo={handleDeleteTodo}
        className="mt-12"
      />
    </div>
  );
}

export default App;
