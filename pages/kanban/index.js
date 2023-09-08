import React from "react";
import { Column } from "../../components/kanban/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { AddCard } from "@/components/kanban/AddCard";

export default function Kanban() {
  const [data, setData] = React.useState({
    columns: {
      UgAwN1hC4LvDh2I8Zlkh: {
        id: "UgAwN1hC4LvDh2I8Zlkh",
        title: "To Do",
        cardsID: ["JA5jgvRKxxHIcBdRWati"],
      },
      MTGDGrG5Fci8iIXT5tvq: {
        id: "MTGDGrG5Fci8iIXT5tvq",
        title: "In Progress",
        cardsID: ["l11Qlum8IC5AHMOjtDvi"],
      },
      Rze3ZwmX6rV8D05JLdUI: {
        id: "Rze3ZwmX6rV8D05JLdUI",
        title: "Done",
        cardsID: ["xccsL9VEn87OipDQ173v"],
      },
    },
    cards: {
      JA5jgvRKxxHIcBdRWati: {
        id: "JA5jgvRKxxHIcBdRWati",
        title: "title 1",
        content: "content 1",
      },
      l11Qlum8IC5AHMOjtDvi: {
        id: "l11Qlum8IC5AHMOjtDvi",
        title: "title 2",
        content: "content 2",
      },
      xccsL9VEn87OipDQ173v: {
        id: "xccsL9VEn87OipDQ173v",
        title: "title 3",
        content: "content 3",
      },
    },
    columnOrder: [
      "UgAwN1hC4LvDh2I8Zlkh",
      "MTGDGrG5Fci8iIXT5tvq",
      "Rze3ZwmX6rV8D05JLdUI",
    ],
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
    <div className="bg-gradient-to-b from-[#F1A7F1] to-[#FAD0C4] min-h-screen w-full items-center flex flex-col ">
      {isModalOpen && (
        <AddCard
          data={data}
          setIsModalOpen={setIsModalOpen}
          setData={setData}
        />
      )}

      <div className="flex flex-col items-center font-semibold text-4xl py-8 font-bold text-white">
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
                className="flex items-start w-[80%]"
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
                      setIsModalOpen={setIsModalOpen}
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
