import React from "react";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import clsx from "clsx";

export const TodoCard = ({ user, title, description, status }) => {
  const [todoCard, setTodoCard] = React.useState({
    user,
    title,
    description,
    status,
  });
  return (
    <div className="border-r border-b border-l border-gray-400 bg-white w-full rounded-b p-4 ">
      <div className="flex items-center gap-x-2">
        <div className="flex-1 text-gray-900 font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis">
          Can coffee make you a better developer?
        </div>
        <div
          className={clsx(
            "uppercase text-xs font-bold rounded-sm p-1",
            `${
              todoCard.status === "pending" ? "bg-orange-300" : "bg-green-300"
            }`
          )}
        >
          {todoCard.status}
        </div>
        <button
          onClick={() =>
            setTodoCard((todo) => {
              const newStatus =
                todo.status === "completed" ? "pending" : "completed";
              return { ...todo, status: newStatus };
            })
          }
        >
          {todoCard.status === "completed" ? <FaToggleOn /> : <FaToggleOff />}
        </button>
        <button onClick={() => alert("Delete this card")}>
          <FaTrash />
        </button>
      </div>
      <p className="text-gray-700 text-base text-justify mt-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
        nihil.
      </p>
    </div>
  );
};
