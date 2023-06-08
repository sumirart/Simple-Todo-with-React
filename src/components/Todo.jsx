import React, { useState } from "react";
import { FaPen, FaTrash, FaSpinner } from "react-icons/fa";

export default function Todo({
  item,
  handleToggle,
  handleDelete,
  handleEdited,
  isLoadingToggleDelete,
}) {
  const [isHovering, setIsHovering] = useState(false);
  function handleMouseOver() {
    setIsHovering(true);
  }

  function handleMouseOut() {
    setIsHovering(false);
  }

  function toggleTodo(id, isCompleted) {
    if (isLoadingToggleDelete) return;

    handleToggle(id, isCompleted);
  }

  function deleteTodo(id) {
    if (isLoadingToggleDelete) return;

    handleDelete(id);
  }

  return (
    <li
      // onClick={handleToggle(item.id)} cannot do this
      className={`flex cursor-pointer items-center gap-x-2 px-3 text-lg hover:bg-slate-100`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span
        onClick={() => toggleTodo(item.id, item.isCompleted)}
        className={`flex-1 py-5 ${item.isCompleted && "line-through"}`}
      >
        {item.todo}
      </span>
      <span
        onClick={() => handleEdited(item)}
        className={`${isHovering ? "block" : "hidden"} p-2`}
      >
        {isLoadingToggleDelete && <FaSpinner className="animate-spin" />}
      </span>

      <span
        onClick={() => handleEdited(item)}
        className={`${isHovering ? "block" : "hidden"} p-2`}
      >
        <FaPen />
      </span>
      <span
        onClick={() => deleteTodo(item.id)}
        className={`${isHovering ? "block" : "hidden"} p-2`}
      >
        <FaTrash />
      </span>
    </li>
  );
}
