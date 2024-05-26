import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";
import TodoEdit from "./TodoEdit";
import Container from "./styles/Container";
import Div from "./styles/Div";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import { changeState, setTodos } from "./todoSlice";

// Functionality

function Todo() {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.state);

  useEffect(() => {
    let todos = [];
    dispatch(changeState("loading"));
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // onSnapshot is asynchronus.. Once It Changes, It Gets Triggered Again and Returns New Data Continuously... So Cleaning The Local Array Is Pretty Important Here!
      querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() });
      });
      dispatch(changeState("stable"));
      dispatch(setTodos(todos));
      todos = [];
    });

    return () => unsubscribe();
  }, []);

  const editTodo = useSelector((store) => store.editTodo);
  return (
    <Div>
      <Container>
        <TodoHeader />
        <div
          style={{
            borderBottom: "1px solid black",
            marginTop: "10px",
          }}
        ></div>
        <TodoInput />
        {state === "loading" && <p>Loading....</p>}
        {state === "stable" && (
          <>
            <TodoFilters />
            {editTodo ? <TodoEdit /> : <TodoList />}
          </>
        )}
      </Container>
    </Div>
  );
}

export default Todo;
