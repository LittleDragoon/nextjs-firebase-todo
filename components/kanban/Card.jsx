import React from "react";

export const Card = ({ title, content }) => {
  return (
    <div className="border-r border-b border-l border-gray-400 bg-white min-w-full rounded-b p-4 my-2">
      <div className="flex items-center gap-x-2">
        <div className="flex-1 text-gray-900 font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </div>
      </div>
      <p className="text-gray-700 text-base text-justify mt-4">{content}</p>
    </div>
  );
};
