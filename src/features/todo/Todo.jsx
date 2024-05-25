import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
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
import { FcTodoList } from "react-icons/fc";

import { useState } from "react";

const Div = styled.div`
  min-height: 100vh;
  min-width: 100dvw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #85ffbd;
  background-image: linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%);
`;

const Container = styled.div`
  border: none;
  width: 500px;
  padding: 15px;
  background-color: RGB(255, 255, 255, 0.3);
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  margin: 50px 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const List = styled.div`
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
`;

const Item = styled.div`
  border: 1px solid black;
  padding: 5px 10px;
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 2px;
  margin-right: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  border: none;

  background-color: rgba(0, 25, 33, 0.1);

  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  & .icon {
    transition: transform 0.2s linear;
    cursor: pointer;
  }

  & .icon:hover {
    transform: scale(1.3);
  }

  & #title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
    font-family: "Courier New", Courier, monospace;
  }

  & #description {
    font-style: italic;
  }

  & #time {
    font-size: 10px;
    margin-top: 5px;
  }
`;

const Input = styled.input`
  border: none;
  padding: 4px;
  margin: 2px 0;
  border-radius: 3px;
  outline: none;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  & label {
    font-size: 12px;
    font-weight: bold;
  }

  & * {
    flex-grow: 1;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 5px 2px;
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  margin-bottom: 7px;
  color: #090909;
  padding: 5px 10px;
  font-size: 10px;
  border-radius: 0.5em;
  background: #e8e8e8;
  cursor: pointer;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  &:hover {
    border: 1px solid gray;
  }

  &:active {
    box-shadow: 4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  outline: none;
  border: 1px solid #e8e8e8;
  padding: 5px 12px;
  background-color: white;
  cursor: pointer;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  transition: all 0.2s;

  &:hover {
    border: 1px solid gray;
  }

  &:disabled {
    transform: none;
    background-color: #bbbeb6;
  }

  &:disabled:hover {
    cursor: auto;
    color: gray;
  }
`;

const Header = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  & select {
    border: none;
    outline: none;
    border-radius: 3px;
    padding: 3px 2px;
  }
`;

// Functionality

function Todo() {
  return (
    <Div>
      <Container>
        <Header>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              textTransform: "uppercase",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <FcTodoList />
              <span>Todo</span>
            </span>
          </div>
          <div style={{ textAlign: "center" }}>
            <div>Completed</div>
            <div>2 / 3</div>
          </div>
        </Header>
        <div
          style={{
            borderBottom: "1px solid black",
            marginTop: "10px",
          }}
        ></div>
        <TodoInput />
        <TodoFilters />
        <TodoList />
      </Container>
    </Div>
  );
}

function TodoFilters() {
  const dispatch = useDispatch();
  const todosLength = useSelector((store) => store.todos.length);
  return (
    <FilterContainer>
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
      <Button
        onClick={() => dispatch(completedAll())}
        disabled={todosLength <= 0}
      >
        Mark All As Completed
      </Button>
      <Button
        onClick={() => dispatch(removeAllTodos())}
        disabled={todosLength <= 0}
      >
        Remove All Tasks
      </Button>
    </FilterContainer>
  );
}

function TodoInput() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  return (
    <InputContainer>
      <InputDiv>
        <label htmlFor="">Enter Title</label>
        <Input
          type="text"
          placeholder="Add Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // onChange={handleInput}
          name="title"
        />
      </InputDiv>
      <InputDiv>
        <label htmlFor="">Enter Description</label>
        <Input
          type="text"
          placeholder="Add Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
        />
      </InputDiv>
      <SubmitButton
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
      >
        <FaPlus />
      </SubmitButton>
    </InputContainer>
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
  const [open, setOpen] = useState(true);
  return (
    <Item>
      <div>
        <div
          id="title"
          style={{ textDecoration: `${todo.completed ? "line-through" : ""}` }}
        >
          {todo.title}
        </div>
        {open && <div id="description">{todo.description}</div>}
        {/* <div id="time">Created / Updated at : {todo.updatedAt} </div> */}
      </div>
      {/*  */}
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          marginTop: "2px",
          gap: "5px",
          alignItems: "center"
        }}
      >
        <div>
          <IoIosRemoveCircle
            className="icon"
            onClick={() => dispatch(removeTodo(todo.id))}
          />
        </div>
        <div>
          {!todo.completed ? (
            <FaCheck
              className="icon"
              onClick={() => {
                dispatch(modifyTodo(todo.id));
              }}
            />
          ) : (
            <IoClose
              className="icon"
              onClick={() => {
                dispatch(modifyTodo(todo.id));
              }}
            />
          )}
        </div>
        <div>
          <button onClick={() => setOpen((bool) => !bool)}>
            {open ? "Close" : "Open"}
          </button>
        </div>
      </div>
    </Item>
  );
}

export default Todo;
