import React from "react";
import { Card } from "../../components/kanban/Card";
import { Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";

export const Column = ({ column, cards, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={clsx(
              "flex flex-col w-1/3 gap-y-2 m-2 p-2 border",
              `${snapshot.draggingOver ? "bg-red-200 z-1" : null}`
            )}
          >
            <div
              {...provided.dragHandleProps}
              className="font-bold text-2xl m-2"
            >
              {column.title}
            </div>
            <Droppable droppableId={column.id} type="card">
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
                      "min-h-[250px]"
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
      }}
    </Draggable>
  );
};
