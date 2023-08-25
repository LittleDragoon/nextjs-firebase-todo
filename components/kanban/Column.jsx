import React from "react";
import { Card } from "../../components/kanban/Card";
import { Droppable } from "react-beautiful-dnd";
import clsx from "clsx";

export const Column = ({ column, cards }) => {
  return (
    <div className="flex flex-col w-1/3 gap-y-2 m-2 p-2 border">
      <div className="font-bold text-2xl m-2">{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={clsx(
                `${
                  snapshot.isDraggingOver
                    ? "bg-gradient-to-b from-[#CCFBFF] to-[#CCFBF0] ease-in-out duration-400 "
                    : null
                }`,
                "min-h-[400px]"
              )}
            >
              {cards.map((card, index) => (
                <Card card={card} key={card.id} index={index} />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};
