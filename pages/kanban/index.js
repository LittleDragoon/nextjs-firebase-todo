import React from "react";
import { Column } from "../../components/kanban/Column";
import { DragDropContext } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";

export default function Kanban() {
  const [data, setData] = React.useState({
    columns: {
      "column-1": {
        id: "column-1",
        title: "Column Title",
        cardsID: ["card-1", "card-2", "card-3"],
      },
    },
    cards: {
      "card-1": {
        id: "card-1",
        title: "title 1",
        content: "content 1",
      },
      "card-2": {
        id: "card-2",
        title: "title 2",
        content: "content 2",
      },
      "card-3": {
        id: "card-3",
        title: "title 3",
        content: "content 3",
      },
    },
    columnOrder: ["column-1"],
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return null;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return null;
    }

    const column = data.columns[source.droppableId];
    const newCardsID = [...column.cardsID];

    /**
     * Move the selected card to its new position
     */
    newCardsID.splice(source.index, 1);
    // This line deletes 0 element at position destination.index and inserts draggableId
    newCardsID.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      cardsID: newCardsID,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: {
          ...newColumn,
        },
      },
    };

    setData(newData);
  };
  return (
    <div className="bg-gradient-to-b from-[#F1A7F1] to-[#FAD0C4] min-h-screen ">
      <div className="flex flex-col items-center font-semibold text-4xl py-4 font-bold text-white">
        Trello 2.0
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map((column, index) => {
          const col = data.columns[column];
          const cards = data.columns[column].cardsID.map(
            (cardID) => data.cards[cardID]
          );

          return (
            <div className="flex flex-col" key={index}>
              <Column column={col} cards={cards} />
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

// "https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md"
export async function getServerSideProps() {
  resetServerContext();
  return { props: { data: [] } };
}
