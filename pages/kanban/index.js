import { Column } from "../../components/kanban/Column";

export default function Kanban() {
  const initialData = {
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
        title: "title",
        content: "content",
      },
      "card-2": {
        id: "card-2",
        title: "title",
        content: "content",
      },
      "card-3": {
        id: "card-3",
        title: "title",
        content: "content",
      },
    },
    columnOrder: ["column-1"],
  };
  return (
    <div className="bg-gradient-to-b from-[#F1A7F1] to-[#FAD0C4] min-h-screen ">
      <div className="flex flex-col items-center font-semibold text-4xl py-4 font-bold text-white">
        Trello 2.0
      </div>
      {initialData.columnOrder.map((column, index) => {
        const cards = initialData.columns[column].cardsID.map(
          (cardID) => initialData.cards[cardID]
        );

        return (
          <div className="flex flex-col" key={index}>
            <Column column={initialData.columns[column]} cards={cards} />
          </div>
        );
      })}
    </div>
  );
}
