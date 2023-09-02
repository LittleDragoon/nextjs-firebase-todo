import React from "react";
import { Column } from "../../components/kanban/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";

export default function Kanban() {
  const [data, setData] = React.useState({
    columns: {
      "column-1": {
        id: "column-1",
        title: "Column Title 1",
        cardsID: ["card-1", "card-2", "card-3"],
      },
      "column-2": {
        id: "column-2",
        title: "Column Title 2",
        cardsID: ["card-4", "card-5", "card-6"],
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
      "card-4": {
        id: "card-4",
        title: "title 4",
        content: "content 4",
      },
      "card-5": {
        id: "card-5",
        title: "title 5",
        content: "content 5",
      },
      "card-6": {
        id: "card-6",
        title: "title 6",
        content: "content 6",
      },
    },
    columnOrder: ["column-1", "column-2"],
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return null;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return null;
    }
    if (type === "column") {
      const col = [...data.columnOrder];
      col.splice(source.index, 1);
      col.splice(destination.index, 0, draggableId);

      const newData = {
        ...data,
        columnOrder: col,
      };

      setData(newData);
      return;
    }
    if (destination.droppableId === source.droppableId) {
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
    } else {
      const sourceColumn = data.columns[source.droppableId];
      const sourceNewCardsID = [...sourceColumn.cardsID];

      const destinationColumn = data.columns[destination.droppableId];
      const destinationNewCardsID = [...destinationColumn.cardsID];

      sourceNewCardsID.splice(source.index, 1);
      // This line deletes 0 element at position destination.index and inserts draggableId
      destinationNewCardsID.splice(destination.index, 0, draggableId);

      const sourceNewColumn = {
        ...sourceColumn,
        cardsID: sourceNewCardsID,
      };

      const destinationNewColumn = {
        ...destinationColumn,
        cardsID: destinationNewCardsID,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [sourceNewColumn.id]: {
            ...sourceNewColumn,
          },
          [destinationNewColumn.id]: {
            ...destinationNewColumn,
          },
        },
      };

      setData(newData);
    }
  };
  return (
    <div className="bg-gradient-to-b from-[#F1A7F1] to-[#FAD0C4] min-h-screen ">
      <div className="flex flex-col items-center font-semibold text-4xl py-4 font-bold text-white">
        Trello 2.0
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex items-start"
              >
                {data.columnOrder.map((column, index) => {
                  const col = data.columns[column];
                  const cards = data.columns[column].cardsID.map(
                    (cardID) => data.cards[cardID]
                  );

                  return (
                    <Column
                      column={col}
                      cards={cards}
                      key={column}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

// "https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md"
export async function getServerSideProps() {
  resetServerContext();
  return { props: { data: [] } };
}
