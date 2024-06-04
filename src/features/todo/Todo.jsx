import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";
import TodoEdit from "./TodoEdit";
import Container from "./styles/Container";
import Div from "./styles/Div";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// Functionality

function Todo() {
  const editTodo = useSelector((store) => store.editTodo);
  
  useEffect(function () {
    document.title = "Todo | React";
  }, []);

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
