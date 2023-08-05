import React from "react";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import clsx from "clsx";

export const TodoList = () => {
  const [todoList, setTodoList] = React.useState({
    user: "1",
    title: "This is the title",
    description: "description",
    status: "pending",
    // createdAt: new Date().getTime(),
  });
  return (
    <div class="border-r border-b border-l border-gray-400 bg-white w-1/3 rounded-b p-4 ">
      <div class="flex items-center gap-x-2">
        <div class="flex-1 text-gray-900 font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis">
          Can coffee make you a better developer?
        </div>
        <div
          className={clsx(
            "uppercase text-xs font-bold rounded-sm p-1",
            `${
              todoList.status === "pending" ? "bg-orange-300" : "bg-green-300"
            }`
          )}
        >
          {todoList.status}
        </div>
        <button
          onClick={() =>
            setTodoList((todo) => {
              const newStatus =
                todo.status == "completed" ? "pending" : "completed";
              return { ...todo, status: newStatus };
            })
          }
        >
          <FaToggleOff />
        </button>
        <button onClick={() => alert("Delete this card")}>
          <FaTrash />
        </button>
      </div>
      <p class="text-gray-700 text-base text-justify mt-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
        nihil.
      </p>
    </div>
  );
};
