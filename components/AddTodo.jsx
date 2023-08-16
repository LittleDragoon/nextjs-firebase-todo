import React from "react";
import { addTodoCard } from "../api/todo";
import { useAuth } from "../hooks/useAuth";

export const AddTodo = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("Pending");

  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-y-3 w-2/5 items-center pt-4 mb-8">
      <input
        className="w-full rounded-sm text-white border border-gray-400 px-2 py-2 bg-transparent"
        autoFocus={true}
        type="text"
        id="title-id"
        name="title-name"
        placeholder="Enter a title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full rounded-sm text-white border border-gray-400 px-2 py-2 bg-transparent min-h-[40px]"
        id="description-id"
        name="description-name"
        placeholder="Enter a description"
        rows="4"
        cols="50"
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full rounded-sm text-white border border-gray-400 px-2 py-2 bg-transparent"
        name="status"
        id="status-id"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Pending">Pending ⌛</option>
        <option value="Completed">Completed ✅</option>
      </select>
      <button
        className="w-full color-gray-400 bg-gradient-to-tr from-[#000428] to-[#004e92] rounded-md px-2 text-bold text-center"
        type="button"
        name="add-todo"
        onClick={() =>
          addTodoCard({ userId: user.uid, title, description, status })
        }
      >
        <b className="text-gray-400">Add</b>
      </button>
    </div>
  );
};
