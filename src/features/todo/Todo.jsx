import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";
import TodoEdit from "./TodoEdit";

import { useDispatch, useSelector } from "react-redux";
import useFetchTodos from "../../hooks/useFetchTodos";
import { setTodos } from "./todoSlice";
import { useEffect } from "react";

// Functionality

function Todo() {
  const editTodo = useSelector((store) => store.todos.editTodo);
  const userId = useSelector((store) => store.auth.currentUser.uid);
  const dispatch = useDispatch();

  const { data: todos, isLoading, isFetched } = useFetchTodos(userId);

  useEffect(() => {
    if (isFetched) dispatch(setTodos(todos));
  }, [isFetched, todos, dispatch]);

  return (
    <>
      <TodoHeader />
      <div
        style={{
          borderBottom: "2px solid black",
          marginTop: "10px",
        }}
      ></div>
      <TodoInput />
      {isLoading && <p>Loading....</p>}
      {!isLoading && (
        <>
          <TodoFilters />
          {editTodo ? <TodoEdit /> : <TodoList />}
        </>
      )}
    </>
  );
}

export default Todo;
