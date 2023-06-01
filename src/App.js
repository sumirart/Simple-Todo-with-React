import { useState } from "react";

import TodosWrapper from "./components/TodosWrapper";

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

    const newTodo = {
      id: todos.length, // start with empty array will be 0
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

      <div className="input mb-8">
        <form className="" onSubmit={handleAddTodo}>
          <div className="mt-2 flex">
            <input
              id="todo"
              name="todo"
              type="text"
              required
              // if we want to control input (controlled input)
              // value={todo}
              // onChange={handleChangeTodoInput}
              placeholder="What do you want to do.."
              className="block w-full rounded-md border-0 px-4 py-4 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-100 sm:leading-6"
            />
            <input
              type="submit"
              value="Add"
              className="ml-2 cursor-pointer rounded-md bg-blue-600 px-8 py-4 text-lg text-white hover:bg-blue-500"
            />
          </div>
        </form>
      </div>
      <TodosWrapper
        todos={todos}
        handleToggle={handleToggle}
        className="mt-12"
      />
    </div>
  );
}

export default App;
