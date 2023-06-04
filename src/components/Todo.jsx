import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

export default function Todo({
  item,
  handleToggle,
  handleDeleteTodo,
  handleEditedTodo,
}) {
  const [isHovering, setIsHovering] = useState(false);
  function handleMouseOver() {
    setIsHovering(true);
  }

  function handleMouseOut() {
    setIsHovering(false);
  }

  return (
    <li
      // onClick={handleToggle(item.id)} cannot do this
      className={`flex cursor-pointer items-center gap-x-2 px-3 text-lg hover:bg-slate-100`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span
        onClick={() => handleToggle(item.id, item.isCompleted)}
        className={`flex-1 py-5 ${item.isCompleted && "line-through"}`}
      >
        {item.todo}
      </span>
      <span
        onClick={() => handleEditedTodo(item)}
        className={`${isHovering ? "block" : "hidden"} p-2`}
      >
        <FaPen />
      </span>
      <span
        onClick={() => handleDeleteTodo(item.id)}
        className={`${isHovering ? "block" : "hidden"} p-2`}
      >
        <FaTrash />
      </span>
    </li>
  );
}
