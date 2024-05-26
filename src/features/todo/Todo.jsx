import styled from "styled-components";
import { FaCaretUp, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaCaretDown } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import {
  removeTodo,
  removeAllTodos,
  createTodo,
  modifyTodo,
  completedAll,
  filterTodos,
  editTodoId,
  removeEditMode,
  editTodo,
} from "./todoSlice";
import { IoClose, IoCloseSharp } from "react-icons/io5";
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
  max-width: 500px;
  padding: 15px;
  background-color: RGB(255, 255, 255, 0.3);
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  margin: 50px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const List = styled.div`
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  max-height: 500px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e0e0e0;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #85ffbd;
    background-image: linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    border-radius: 100px;
  }
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
    margin-bottom: 2px;
    font-family: "Courier New", Courier, monospace;
    word-break: break-word;
  }

  & #description {
    font-style: italic;
    word-break: break-word;
  }

  & #time {
    font-size: 10px;
    margin-top: 5px;
  }

  & #status {
    font-size: 10px;
    display: flex;
    gap: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    padding: 5px 3px;
    display: inline-block;
  }

  & #status div:last-child {
    color: ${(props) => (props.status === "completed" ? "green" : "red")};
    font-weight: bold;
    font-style: ${(props) =>
      props.status === "completed" ? "bold" : "italic"};
  }

  & button {
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 10px;

    display: flex;
    align-items: center;
    gap: 3px;

    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s;
  }

  & button:hover {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
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

  & * {
    flex-grow: 1;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 5px 2px;

  & label {
    font-size: 12px;
    font-weight: bold;
  }
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

const CompletedDiv = styled.div`
  padding: 12px 15px;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 3px;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

  & :first-child {
    font-size: 10px;
    font-weight: bolder;
  }

  :last-child {
    font-weight: bold;
    font-size: 20px;
    color: green;
  }

  :last-child span {
    color: black;
  }
`;

// Functionality

function TodoHeader() {
  const todos = useSelector((store) => store.todos);
  const completedTodos = todos.filter((todo) => todo.completed === true);

  return (
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
      <CompletedDiv>
        <div>Completed</div>
        <div>
          {completedTodos.length}
          {todos.length > 0 && <span> / {todos.length}</span>}
        </div>
      </CompletedDiv>
    </Header>
  );
}

function Todo() {
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
        <TodoFilters />
        {editTodo ? <TodoEdit /> : <TodoList />}
      </Container>
    </Div>
  );
}

function TodoEdit() {
  const { title, description } = useSelector((store) =>
    store.todos.find((todo) => todo.id === store.editTodo)
  );
  const dispatch = useDispatch();

  const [editTitle, setEditTitle] = useState(function () {
    return title;
  });

  const [editDescription, setEditDescription] = useState(() => description);

  return (
    <Item>
      <InputDiv>
        <label htmlFor="">Title</label>
        <Input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
      </InputDiv>
      <InputDiv>
        <label htmlFor="">Description</label>
        <Input
          type="text"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
      </InputDiv>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <button
          onClick={() => {
            if (editTitle.length > 0 && editDescription.length > 0) {
              dispatch(editTodo(editTitle, editDescription));
            }
          }}
        >
          <FaEdit /> Edit
        </button>
        <button onClick={() => dispatch(removeEditMode())}>
          <IoCloseSharp /> Close
        </button>
      </div>
    </Item>
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
  const [open, setOpen] = useState(() => (todo.completed ? false : true));

  return (
    <Item status={todo.completed ? "completed" : "pending"}>
      <div>
        <div
          id="title"
          style={{
            textDecoration: `${todo.completed ? "line-through" : ""}`,
            textDecorationColor: `${todo.completed ? "green" : ""}`,
          }}
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
          alignItems: "center",
        }}
      >
        <div></div>
        <div>
          <MdDelete
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
          <FaEdit
            className="icon"
            onClick={() => dispatch(editTodoId(todo.id))}
          />
        </div>
        <div>
          {open ? (
            <FaCaretUp className="icon" onClick={() => setOpen(false)} />
          ) : (
            <FaCaretDown className="icon" onClick={() => setOpen(true)} />
          )}
        </div>
      </div>
    </Item>
  );
}

export default Todo;
