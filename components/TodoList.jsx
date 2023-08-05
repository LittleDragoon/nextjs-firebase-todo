import React from "react";
import { TodoCard } from "./TodoCard";
import { db } from "../firebase/index";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export const TodoList = () => {
  const [todoList, setTodoList] = React.useState(null);

  const { userEmail } = useAuth();
  // getAllDocs gets called only when user changes (not when data in firestore change)
  const getAllDocs = () => {
    // onSnapshot always listen to changes in firebase and the callback functon gets executed
    onSnapshot(collection(db, "todoList"), (querySnapchot) => {
      let userTemporaryTodoList = [];
      querySnapchot.docs.forEach((doc) => {
        userTemporaryTodoList.push(doc.data());
      });
      setTodoList(userTemporaryTodoList);
    });
  };

  React.useEffect(getAllDocs, [userEmail]);

  return (
    <div className="grid grid-cols-3 gap-6 p-10">
      {todoList &&
        todoList.map((x, i) => (
          <TodoCard key={i} user title description status />
        ))}
    </div>
  );
};
