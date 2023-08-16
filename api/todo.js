import {
  doc,
  deleteDoc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/index";

// Add a new document with a automatic generated "id".
export const addTodoCard = async ({ userId, title, description, status }) => {
  try {
    await addDoc(collection(db, "todoList"), {
      user: userId,
      title: title,
      description: description,
      status: status,
      //to order firebase documents
      createdAt: new Date().getTime(),
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

export const updateCard = async (documentId, status) => {
  const documentToUpdateRef = doc(db, "todoList", documentId);
  await updateDoc(documentToUpdateRef, { status: status });
};
