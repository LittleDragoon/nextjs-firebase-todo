import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/index";

// Add a new document with a generated id.
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
