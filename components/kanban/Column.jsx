import React from "react";
import { Card } from "../../components/kanban/Card";
import { Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import { IoMdAddCircle } from "react-icons/io";

export const Column = ({ column, cards, index, setIsModalOpen }) => {
  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.draggableProps}
              ref={provided.innerRef}
              className={clsx(
                "flex flex-col w-1/3 gap-y-2 m-2 p-2 border bg-pink-100 rounded-md mx-4",
                `${snapshot.draggingOver ? "!bg-blue-100 z-1" : null}`
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
                            ? "bg-blue-100 ease-in-out duration-400 "
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
              <div className="flex justify-end pb-4 pr-2 ">
                <button className="text-green-500 h-[12px]" onClick={openModal}>
                  <IoMdAddCircle className="h-8 w-8" />
                </button>
              </div>
            </div>
          );
        }}
      </Draggable>
    </>
  );
};
