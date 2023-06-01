import { useState } from "react";

import Input from "./components/Input";
import TodosWrapper from "./components/TodosWrapper";
import randomize from "./utils/randomize";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 0,
      todo: "Wash shoes",
      isCompleted: true,
    },
    {
      id: 1,
      todo: "Buy groceries",
      isCompleted: false,
    },
    {
      id: 2,
      todo: "Do homework",
      isCompleted: false,
    },
  ]);
  // const [todo, setTodo] = useState(""); can have another state to control the text input

  function handleAddTodo(e) {
    e.preventDefault();

    const id = randomize();
    const newTodo = {
      id,
      todo: e.target.elements[0].value,
      isCompleted: false,
    };

    e.target.elements[0].value = "";
    setTodos([...todos, newTodo]);
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
  // function handleChangeTodoInput(e) {
  //   console.log(e.target.value);
  //   if (e.target.value === "e") {
  //     return;
  //   }

  //   setTodo(e.target.value);
  // }

  return (
    <div className="App">
      <header>
        <h1 className="mb-8 text-center text-3xl font-bold">Simple Todo</h1>
      </header>
      <Input handleAddTodo={handleAddTodo} />
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
