import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, setTodos } from "../features/todo/todoSlice";
import { db } from "../firebase/firebase";

function useFetchTodos() {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.auth.currentUser.uid);
  

  // useEffect(() => {
  //   const q = query(collection(db, "todos"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     let todos = [];
  //     dispatch(changeStatus("loading"));
  //     // onSnapshot is asynchronus.. Once It Changes, It Gets Triggered Again and Returns New Data Continuously... So Cleaning The Local Array Is Pretty Important Here!

  //     querySnapshot.forEach((doc) => {
  //       todos.push({ id: doc.id, ...doc.data() });
  //     });

  //     dispatch(setTodos(todos));
  //     // When Inserted Item, Firebase Will Return New Item First and Later Returns all Items

  //     dispatch(changeStatus("stable"));
  //     todos = [];
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // });

  useEffect(() => {

    const unSub = onSnapshot(
      collection(db, "todos"),
      (snapshot) => {
        let todos = [];
        dispatch(changeStatus("loading"));
        snapshot.docs.forEach((doc) => {
          if ({ ...doc.data() }.user === userId)
            todos.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setTodos(todos));
        dispatch(changeStatus("stable"));
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unSub();
  });
}

export default useFetchTodos;