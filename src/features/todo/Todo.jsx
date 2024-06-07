import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";
import TodoEdit from "./TodoEdit";

import { useDispatch, useSelector } from "react-redux";
import useFetchTodos from "../../hooks/useFetchTodos";
import { setTodos } from "./todoSlice";
import { useEffect } from "react";
import Spinner from "./styles/Spinner";
import toast from "react-hot-toast";

// Functionality

function Todo() {
  const editTodo = useSelector((store) => store.todos.editTodo);
  const userId = useSelector((store) => store.auth.currentUser.uid);
  const dispatch = useDispatch();

  const {
    data: todos,
    isLoading,
    isFetched,
    isError,
    error,
  } = useFetchTodos(userId);

  useEffect(() => {
    if (isFetched) dispatch(setTodos(todos));
    if (isError) toast.error(error.message);
  }, [isFetched, todos, dispatch, isError, error]);

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
      {isLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </div>
      )}
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
