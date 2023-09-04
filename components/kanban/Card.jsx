import React from "react";
import { Draggable } from "react-beautiful-dnd";

export const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="border border-gray-200 shadow bg-white rounded-b p-4 m-2 h-[100px]"
          >
            <div className="flex items-center gap-x-2">
              <div className="flex-1 text-gray-900 font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis">
                {card.title}
              </div>
            </div>
            <p className="text-gray-700 text-base text-justify mt-4">
              {card.content}
            </p>
          </div>
        );
      }}
    </Draggable>
  );
};
