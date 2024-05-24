import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import {
  removeTodo,
  removeAllTodos,
  createTodo,
  modifyTodo,
  completedAll,
  filterTodos,
} from "./todoSlice";
import { IoClose } from "react-icons/io5";

import { useState } from "react";

const Div = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  border: 1px solid black;
  width: 50%;
  height: auto;
`;

const List = styled.div`
  background-color: gainsboro;
`;

const Item = styled.div`
  border: 1px solid black;
  margin: 2px;
`;

function Todo() {
  return (
    <Div>
      <Container>
        <TodoInput />
        <TodoFilters />
        <TodoList />
      </Container>
    </Div>
  );
}

function TodoFilters() {
  const dispatch = useDispatch();
  return (
    <div>
      <select
        name=""
        id=""
        defaultValue="ALL"
        onChange={(e) => {
          dispatch(filterTodos(e.target.value));
        }}
      >
        <option value="ALL">All</option>
        <option value="COMPLETED">Completed Tasks</option>
        <option value="PENDING">Pending Tasks</option>
      </select>
      <button onClick={() => dispatch(completedAll())}>
        Mark All As Completed
      </button>
      <button onClick={() => dispatch(removeAllTodos())}>
        Remove All Tasks
      </button>
    </div>
  );
}

function TodoInput() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleInput(e) {
    console.log(e.target.name);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Add Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        // onChange={handleInput}
        name="title"
      />
      <input
        type="text"
        placeholder="Add Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="description"
      />
      <FaPlus
        onClick={() => {
          if (title.length > 0 && description.length > 0) {
            dispatch(createTodo(title, description));
            setTitle("");
            setDescription("");
            setError("");
          } else {
            let message =
              title.length <= 0 ? "Enter Title" : "Enter Description";
            setError(message);
          }
        }}
      />
    </div>
  );
}

function TodoList() {
  let todos = useSelector((store) => store.todos);
  let filter = useSelector((store) => store.filter);
  if (filter === "COMPLETED")
    todos = todos.filter((todo) => todo.completed === true);
  if (filter === "PENDING")
    todos = todos.filter((todo) => todo.completed === false);

  return (
    <List>
      {todos?.length > 0 ? (
        todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)
      ) : (
        <p>No Todo Items Available!</p>
      )}
    </List>
  );
}

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  return (
    <Item>
      <div>{todo.title}</div>
      <div
        style={{ textDecoration: `${todo.completed ? "line-through" : ""}` }}
      >
        {todo.description}
      </div>
      <div>
        <MdDeleteForever onClick={() => dispatch(removeTodo(todo.id))} />
      </div>
      <div>
        {!todo.completed ? (
          <FaCheck
            onClick={() => {
              dispatch(modifyTodo(todo.id));
            }}
          />
        ) : (
          <IoClose
            onClick={() => {
              dispatch(modifyTodo(todo.id));
            }}
          />
        )}
      </div>
    </Item>
  );
}

export default Todo;
