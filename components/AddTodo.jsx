import React from "react";
import { addTodoCard } from "../api/todo";
import { useAuth } from "../hooks/useAuth";
import { useToast, Tooltip } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddTodo = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [deadlineDate, setDeadlineDate] = React.useState(null);
  const [status, setStatus] = React.useState("pending");

  const { user, isUserSignedIn } = useAuth();
  const toast = useToast();

  const addTodo = async () => {
    await addTodoCard({
      userId: user.uid,
      title,
      description,
      deadlineDate,
      status,
    });
    setTitle("");
    setDescription("");
    setDeadlineDate(null);
    setStatus("pending");
    toast({
      title: "Card successfully added",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <div className="flex flex-col gap-y-3 w-2/5 items-center pt-4 mb-8">
      <input
        className="w-full rounded-sm text-white border border-gray-400 px-2 py-2 bg-transparent"
        autoFocus={true}
        value={title}
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
        value={description}
        placeholder="Enter a description"
        rows="4"
        cols="50"
        onChange={(e) => setDescription(e.target.value)}
      />
      <DatePicker
        wrapperClassName="w-full"
        className="w-full px-2 py-1 bg-transparent border border-gray-400 text-white rounded-sm"
        placeholderText="Select a deadline : dd-mm-yyyy"
        popperPlacement="right-start"
        selected={deadlineDate}
        minDate={new Date()}
        onChange={(date) => setDeadlineDate(date)}
      />
      <select
        className="w-full rounded-sm text-white border border-gray-400 px-2 py-2 bg-transparent"
        name="status"
        id="status-id"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">Pending ⌛</option>
        <option value="Completed">Completed ✅</option>
      </select>
      {title === "" ||
      description === "" ||
      deadlineDate === null ||
      !isUserSignedIn ? (
        <Tooltip
          maxW="2xl"
          hasArrow
          label={`${
            isUserSignedIn
              ? "Title, Description and Deadline should be filled first"
              : "You must be logged in first"
          }`}
          bg="gray.300"
          color="black"
        >
          <button
            className={
              "w-full color-gray-400 rounded-md px-2 text-bold text-center transition-all duration-500 bg-gradient-to-t from-[#130F35] to-[#004e92] bg-size-200 bg-pos-100 cursor-not-allowed"
            }
            type="button"
            name="add-todo"
            onClick={addTodo}
            disabled={true}
          >
            <b className="text-gray-200">Add</b>
          </button>
        </Tooltip>
      ) : (
        <button
          className={
            "w-full color-gray-400 rounded-md px-2 text-bold text-center transition-all duration-500 bg-gradient-to-t from-[#130F35] to-[#004e92] bg-size-200 bg-pos-0"
          }
          type="button"
          name="add-todo"
          onClick={addTodo}
        >
          <b className="text-gray-200">Add</b>
        </button>
      )}
    </div>
  );
};
