import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

import Input from "../components/Input";
import Title from "../components/Title";
import TodosWrapper from "../components/TodosWrapper";

const ip = `${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/`;

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState(undefined); // currentlyEditedTodo, edited
  const [isLoading, setIsLoading] = useState(false); // isLoadingFetch
  const [isLoadingCreateUpdate, setIsLoadingCreateUpdate] = useState(false);
  const [isLoadingToggleDelete, setIsLoadingToggleDelete] = useState(false);
  const [isFetchError, setIsFetchError] = useState(false);
  const [errorFetchMessage, setErrorFetchMessage] = useState(""); // useReducer

  useEffect(() => {
    setIsLoading(true);
    fetch(`${ip}todos`)
      .then(async (res) => {
        if (!res.ok) {
          const result = await res.json();
          throw new Error(result.error);
        }
        return res.json();
      })
      .then((result) => {
        setTodoList(result);
      })
      .catch((err) => {
        setIsFetchError(true);
        setErrorFetchMessage(err.message);
        handleToast(err.messsage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // if we want to control the input
  function handleChangeTodoInput(e) {
    setTodo(e.target.value);
  }

  function handleToggle(id, isCompleted) {
    setIsLoadingToggleDelete(true);
    fetch(`${ip}todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted: !isCompleted }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const result = await res.json();
          throw new Error(result.error);
        }
        return res.json();
      })
      .then((result) => {
        return todoList.map((item) => {
          if (item.id === result.id) {
            return result;
          }
          return item;
        });
      })
      .then((result) => {
        setTodoList(result);
      })
      .catch((err) => {
        console.log(err.message);
        handleToast("Failed toggle todo, please try again");
      })
      .finally(() => setIsLoadingToggleDelete(false));
  }

  // REFACTOR THIS NAMING FOR BETTER
  function handleCreate(e) {
    e.preventDefault();

    const newTodo = {
      todo,
      isCompleted: false,
    };

    setIsLoadingCreateUpdate(true);

    fetch(`${ip}todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((result) => {
        setTodoList([...todoList, result]);
        setTodo("");
      })
      .catch((err) => {
        console.log(err.message);
        handleToast("Failed to create todo, please try again");
      })
      .finally(() => setIsLoadingCreateUpdate(false));
  }

  function handleDelete(id) {
    setIsLoadingToggleDelete(true);
    fetch(`${ip}todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        return todoList.filter((item) => item.id !== id);
      })
      .then((result) => setTodoList(result))
      .catch((err) => {
        console.log(err.message);
        handleToast("Failed delete todo, please try again");
      })
      .finally(() => setIsLoadingToggleDelete(false));
  }

  function handleEdited(todo) {
    setTodo(todo.todo);
    setEditedTodo(todo);
  }

  function handleCancelEdit() {
    setTodo("");
    setEditedTodo(undefined);
  }

  function handleUpdate(e) {
    e.preventDefault();

    setIsLoadingCreateUpdate(true);
    fetch(`${ip}todos/${editedTodo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...editedTodo, todo }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const result = await res.json();
          throw new Error(result.error);
        }
        return res.json();
      })
      .then((result) => {
        return todoList.map((item) => {
          if (item.id === result.id) {
            return result;
          }
          return item;
        });
      })
      .then((result) => {
        setTodoList(result);
        setTodo("");
        setEditedTodo(undefined);
      })
      .catch((err) => {
        console.log(err.message);
        handleToast("Failed update todo, please try again");
      })
      .finally(() => setIsLoadingCreateUpdate(false));
  }

  function handleToast(error) {
    toast.error(error);
  }

  return (
    <>
      <Title>Todo List</Title>
      <Input
        handleCreateTodo={handleCreate}
        handleChangeTodoInput={handleChangeTodoInput}
        todo={todo}
        editedTodo={editedTodo}
        handleUpdate={handleUpdate}
        handleCancelEdit={handleCancelEdit}
        isLoadingCreateUpdate={isLoadingCreateUpdate}
      />
      {isLoading ? (
        <div className="flex justify-center">
          <FaSpinner className="animate-spin text-5xl text-blue-600" />
        </div>
      ) : isFetchError ? (
        <div className="mt-40 flex flex-col items-center">
          <p className="text-xl">
            Sorry, there was an error load the todo list :({" "}
          </p>
          {/* please make sure the error message is "safe" to be shown to the user */}
          <em className="mb-12">Error: {errorFetchMessage}</em>
          <button
            onClick={() => window.location.reload()}
            className="w-40 rounded-md bg-indigo-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Try again
          </button>
        </div>
      ) : (
        <TodosWrapper
          todos={todoList}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          handleEdited={handleEdited}
          isLoadingToggleDelete={isLoadingToggleDelete}
          className="mt-12"
        />
      )}
    </>
  );
}

export default Todo;
