import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/index";
import { doc, deleteDoc } from "firebase/firestore";

// Add a new document with a automatic generated "id".
export const addTodoCard = async ({ userId, title, description, status }) => {
  try {
    await addDoc(collection(db, "todoList"), {
      user: userId,
      title: title,
      description: description,
      status: status,
    });
  } catch (error) {
    throw new Error(`Error in adding. Here is the reason : ${error}`);
  }
};

// Delete a document with an id.
export const deleteCard = async (documentId) => {
  try {
    /**
     * doc(db, collection_name, document_id)
     * document_id is automatically generated when added to firebase and can be access by the props id (hidden)
     */
    const documentToDeleteRef = doc(db, "todoList", documentId);
    await deleteDoc(documentToDeleteRef);
  } catch (err) {
    throw new Error("Error in deleting cards");
  }
};
