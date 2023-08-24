import React from "react";
import { Card } from "../../components/kanban/Card";

export const Column = ({ column, cards }) => {
  return (
    <div className="flex flex-col w-1/3 gap-y-2 m-2 p-2 border">
      <div className="font-bold text-2xl">{column.title}</div>
      <div className="items-center">
        {cards.map((card, index) => {
          return <Card title={card.title} content={card.content} key={index} />;
        })}
      </div>
    </div>
  );
};
