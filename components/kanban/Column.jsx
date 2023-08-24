import React from "react";
import { Card } from "../../components/kanban/Card";
import { Droppable } from "react-beautiful-dnd";

export const Column = ({ column, cards }) => {
  return (
    <div className="flex flex-col w-1/3 gap-y-2 m-2 p-2 border">
      <div className="font-bold text-2xl">{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
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
