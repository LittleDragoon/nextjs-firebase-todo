import React from "react";
import { TodoCard } from "./TodoCard";
import { db } from "../firebase/index";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export const TodoList = () => {
  const [todoList, setTodoList] = React.useState(null);

  const { user } = useAuth();
  // getAllDocs gets called only when user changes (not when data in firestore change)
  const getAllDocs = () => {
    const orderedQuery = query(
      collection(db, "todoList"),
      orderBy("createdAt", "desc")
    );
    // onSnapshot always listen to changes in firebase and the callback functon gets executed
    onSnapshot(orderedQuery, (querySnapchot) => {
      let userTemporaryTodoList = [];
      querySnapchot.docs.forEach((doc) => {
        //doc has a "hidden" id props which is the automatic generated id of the document
        userTemporaryTodoList.push({ id: doc.id, ...doc.data() });
      });
      setTodoList(userTemporaryTodoList);
    });
  };

  React.useEffect(getAllDocs, [user.email]);

  return (
    <div className="w-full grid grid-cols-3 gap-6 p-10">
      {todoList &&
        todoList.map((card) => (
          <TodoCard
            key={card.id}
            cardId={card.id}
            user={user}
            title={card.title}
            description={card.description}
            status={card.status}
          />
        ))}
    </div>
  );
};
