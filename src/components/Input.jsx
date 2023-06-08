import { FaSpinner } from "react-icons/fa";

export default function Input({
  handleCreateTodo,
  handleChangeTodoInput,
  todo,
  editedTodo,
  handleUpdate,
  handleCancelEdit,
  isLoadingCreateUpdate,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    if (isLoadingCreateUpdate) return;

    if (editedTodo) return handleUpdate(e);

    return handleCreateTodo(e);
  }

  return (
    <div className="input mb-8">
      <form onSubmit={handleSubmit}>
        <div className="mt-2 flex">
          <input
            id="todo"
            name="todo"
            type="text"
            required
            // if we want to control input (controlled input)
            value={todo}
            onChange={handleChangeTodoInput}
            placeholder="What do you want to do.."
            className="block w-full rounded-md border-0 px-4 py-4 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-100 sm:leading-6"
          />
          <button className="ml-2 cursor-pointer rounded-md bg-blue-600 px-8 py-4 text-lg text-white hover:bg-blue-500">
            {isLoadingCreateUpdate ? (
              <FaSpinner className="animate-spin text-[1.75rem] text-xl" />
            ) : editedTodo ? (
              "Save"
            ) : (
              "Add"
            )}
          </button>
          {editedTodo && (
            <button
              onClick={handleCancelEdit}
              className="ml-2 cursor-pointer rounded-md bg-red-600 px-8 py-4 text-lg text-white hover:bg-red-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
