import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";
import TodoEdit from "./TodoEdit";

import { useSelector } from "react-redux";
import useFetchTodos from "./hooks/useFetchTodos";

// Functionality

function Todo() {
  const editTodo = useSelector((store) => store.todos.editTodo);
  const status = useSelector((store) => store.todos.status);

  useFetchTodos();

  return (
    <>
      <TodoHeader />
      <div
        style={{
          borderBottom: "1px solid black",
          marginTop: "10px",
        }}
      ></div>
      <TodoInput />
      {status === "loading" && <p>Loading....</p>}
      {status === "stable" && (
        <>
          <TodoFilters />
          {editTodo ? <TodoEdit /> : <TodoList />}
        </>
      )}
    </>
  );
}

export default Todo;
