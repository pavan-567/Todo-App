import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";
import TodoEdit from "./TodoEdit";
import { useSelector } from "react-redux";

// Functionality

function Todo() {
  const editTodo = useSelector((store) => store.editTodo);


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
      <TodoFilters />
      {editTodo ? <TodoEdit /> : <TodoList />}
    </>
  );
}

export default Todo;
