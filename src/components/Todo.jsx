import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

export default function Todo({ item, handleToggle, handleDeleteTodo }) {
  const [isHovering, setIsHovering] = useState(false);
  function handleMouseOver() {
    setIsHovering(true);
  }

  function handleMouseOut() {
    setIsHovering(false);
  }

  function al(id) {
    alert(id);
  }

  return (
    <li
      // onClick={handleToggle(item.id)} cannot do this
      className={`flex cursor-pointer items-center gap-x-2 px-3 text-lg hover:bg-slate-100`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span
        onClick={() => handleToggle(item.id)}
        className={`flex-1 py-5 ${item.isCompleted && "line-through"}`}
      >
        {item.todo}
      </span>
      <span
        onClick={() => alert(item.id)}
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
