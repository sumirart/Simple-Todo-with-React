import React from "react";

// function TodosWrapper (props) {
//   const toggle = props.toggle
//   const handleToggle = props.handleToggle
//   return (...)
// }

export default function TodosWrapper({ todos, handleToggle }) {
  return (
    <section className="todos">
      <ul className="divide-y divide-gray-100">
        {todos.map((item) => (
          <li
            key={item.id}
            onClick={() => handleToggle(item.id)}
            // onClick={handleToggle(item.id)} cannot do this
            className={`cursor-pointer gap-x-6 py-5 text-lg  hover:bg-slate-100 ${
              item.isCompleted && "line-through"
            }`}
          >
            {item.todo}
          </li>
        ))}
      </ul>
    </section>
  );
}
