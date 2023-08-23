import React from "react";
import { TodoCard } from "./TodoCard";
import { db } from "../firebase/index";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export const TodoList = () => {
  const [todoList, setTodoList] = React.useState(null);

  const { user, isUserSignedIn } = useAuth();
  // getAllDocs gets called only when user changes (not when data in firestore change)
  const getAllDocs = () => {
    if (!isUserSignedIn) {
      setTodoList([]);
      return;
    }

    const orderedQuery = query(
      collection(db, "todoList"),
      where("user", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    // onSnapshot always listen to changes in firebase and the callback functon gets executed
    onSnapshot(orderedQuery, (querySnapchot) => {
      let userTemporaryTodoList = [];
      querySnapchot.docs.forEach((doc) => {
        //doc has a "hidden" id props which is the automatic generated id of the document
        userTemporaryTodoList.push({
          ...doc.data(),
          id: doc.id,
          deadlineDate: doc.data().deadlineDate.toDate(),
        });
      });
      setTodoList(userTemporaryTodoList);
    });
  };

  React.useEffect(getAllDocs, [user.email, isUserSignedIn]);

  return (
    <div className="w-full grid grid-cols-3 gap-6 p-10">
      {todoList &&
        todoList.map((card) => (
          <TodoCard
            key={card.id}
            cardId={card.id}
            title={card.title}
            description={card.description}
            deadlineDate={card.deadlineDate}
            status={card.status}
          />
        ))}
    </div>
  );
};
