import React from "react";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import clsx from "clsx";
import { deleteCard, updateCard } from "@/api/todo";

export const TodoCard = ({
  cardId,
  title,
  description,
  deadlineDate,
  status,
}) => {
  const updateStatus = () => {
    const newStatus = status === "completed" ? "pending" : "completed";
    updateCard(cardId, newStatus);
  };

  const formattedDeadlineDate = deadlineDate
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join("-");
  return (
    <div className="border-r border-b border-l border-gray-400 bg-white min-w-full rounded-b p-4 ">
      <div className="flex items-center gap-x-2">
        <div className="flex-1 text-gray-900 font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </div>
        <div
          className={clsx(
            "uppercase text-xs font-bold rounded-sm p-1",
            `${status === "pending" ? "bg-orange-300" : "bg-green-300"}`
          )}
        >
          {status}
        </div>
        <button onClick={updateStatus}>
          {status === "completed" ? <FaToggleOn /> : <FaToggleOff />}
        </button>
        <button onClick={() => deleteCard(cardId)}>
          <FaTrash />
        </button>
      </div>
      <div className="flex gap-x-2">
        <div>{formattedDeadlineDate}</div>
      </div>
      <p className="text-gray-700 text-base text-justify mt-4">{description}</p>
    </div>
  );
};
