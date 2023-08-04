import React from "react";
import { FaGoogle } from "react-icons/fa";

export const Auth = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("Pending");

  return (
    <>
      <button className="flex items-center gap-x-2 text-gray-200 bg-gradient-to-tr from-[#042354] to-[#004e92] rounded-md my-4 px-2 font-bold text-center">
        <FaGoogle />
        <span>Log in with Google</span>
      </button>
    </>
  );
};
