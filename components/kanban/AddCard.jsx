import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useToast, Tooltip } from "@chakra-ui/react";
import { db } from "../../firebase/index";
import { doc, collection, set, addDoc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const AddCard = ({ data, setIsModalOpen, setData }) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [status, setStatus] = React.useState("To Do");

  const toast = useToast();

  const addCard = async (data) => {
    // Function to add columns in firebase
    // try {
    //   Object.values(data.columns).forEach(async (column) => {
    //     await addDoc(collection(db, "columns"), column);
    //   });
    // } catch (error) {
    //   throw new Error(`Error in adding. Here is the reason : ${error}`);
    // }

    //Functions to add cards
    // try {
    //   Object.values(data.cards).forEach(async (card) => {
    //     await addDoc(collection(db, "card"), card);
    //   });
    // } catch (error) {
    //   throw new Error(`Error in adding. Here is the reason : ${error}`);
    // }

    //Add column order
    // try {
    //   await addDoc(collection(db, "columnOrder"), { order: data.columnOrder });
    // } catch (error) {
    //   throw new Error(`Error in adding. Here is the reason : ${error}`);
    // }

    const newCardId = uuidv4();

    // Create the new card object
    const newCard = {
      id: newCardId,
      title: title,
      content: content,
    };

    const columnIdToAddTo = Object.values(data.columns).filter(
      (column) => column.title === status
    )[0].id;

    try {
      setDoc(doc(db, "columns", columnIdToAddTo), {
        ...data.columns[columnIdToAddTo],
        cardsID: [...data.columns[columnIdToAddTo].cardsID, newCardId],
      });
    } catch (error) {
      console.error("Error Updating Columns:", error);
    }

    try {
      setDoc(doc(db, "card", newCardId), newCard);
    } catch (error) {
      console.error("Error Adding Document:", error);
    }

    // Update the state to add the new card ID to the appropriate column
    setData((prevData) => ({
      ...prevData,
      columns: {
        ...prevData.columns,
        [columnIdToAddTo]: {
          ...prevData.columns[columnIdToAddTo],
          cardsID: [...prevData.columns[columnIdToAddTo].cardsID, newCardId],
        },
      },
      cards: {
        ...prevData.cards,
        [newCardId]: newCard,
      },
    }));
    setTitle("");
    setContent("");
    setStatus("To Do");
    toast({
      title: "Card successfully added",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setIsModalOpen(false);
  };

  const cancelCard = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Overlay to hide what is behind */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-2/5 h-3/5 p-4 rounded-md border border-gray-300 overflow-auto z-20">
        <div className="flex flex-col gap-y-3 w-full h-full items-center">
          <input
            className="w-full rounded-sm border border-gray-400 px-2 py-2 bg-transparent"
            autoFocus={true}
            value={title}
            type="text"
            id="title-id"
            name="title-name"
            placeholder="Enter a title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="flex-1 w-full rounded-sm border border-gray-400 px-2 py-2 bg-transparent min-h-[40px]"
            id="content-id"
            name="content-name"
            value={content}
            placeholder="Enter a content"
            rows="4"
            cols="50"
            onChange={(e) => setContent(e.target.value)}
          />
          <select
            className="w-full rounded-sm border border-gray-400 px-2 py-2 bg-transparent"
            name="status"
            id="status-id"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="To Do">To Do ⌛</option>
            <option value="In Progress">In Progress ✍️ </option>
            <option value="Done">Done ✅</option>
          </select>
          <div className="flex justify-end w-full gap-x-2">
            <button
              className={
                "rounded-md px-2 text-bold text-center rounded-md border border-gray-400 min-w-2/5"
              }
              type="button"
              name="add-todo"
              onClick={cancelCard}
            >
              <b className="text-gray-500">Cancel</b>
            </button>
            <Tooltip
              maxW="2xl"
              hasArrow
              label={`${
                title === "" || content === ""
                  ? "Title and Content should be filled first"
                  : ""
              }`}
              bg="gray.300"
              color="black"
            >
              <button
                className={
                  "color-gray-400 rounded-md px-2 text-bold text-center bg-gradient-to-t from-[#130F35] to-[#004e92] min-w-[60px]"
                }
                disabled={title === "" || content === ""}
                type="button"
                name="add-todo"
                onClick={() => addCard(data)}
              >
                <b className="text-gray-200">Add</b>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};
