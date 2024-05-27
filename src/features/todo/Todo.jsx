import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";
import TodoEdit from "./TodoEdit";
import Container from "./styles/Container";
import Div from "./styles/Div";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import { changeStatus, setTodos } from "./todoSlice";
import useFetchTodos from "./hooks/useFetchTodos";

// Functionality

function Todo() {
  const editTodo = useSelector((store) => store.editTodo);
  const status = useSelector((store) => store.status);

  useFetchTodos();

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
        {status === "loading" && <p>Loading....</p>}
        {status === "stable" && (
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
