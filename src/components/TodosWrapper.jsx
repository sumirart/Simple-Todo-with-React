import React from "react";
import Todo from "./Todo";

// function TodosWrapper (props) {
//   const toggle = props.toggle
//   const handleToggle = props.handleToggle
//   return (...)
// }

export default function TodosWrapper({
  todos,
  handleToggle,
  handleDelete,
  handleEdited,
  isLoadingToggleDelete,
}) {
  return (
    <section className="todos">
      <ul className="divide-y divide-gray-100">
        {todos.map((item) => (
          <Todo
            key={item.id}
            item={item}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            handleEdited={handleEdited}
            isLoadingToggleDelete={isLoadingToggleDelete}
          />
        ))}
      </ul>
    </section>
  );
}
