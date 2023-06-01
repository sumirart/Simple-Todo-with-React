import React from "react";

export default function Input({ handleAddTodo }) {
  return (
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
  );
}
