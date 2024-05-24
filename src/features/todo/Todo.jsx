import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

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

function Todo() {
  return (
    <Div>
      <Container>
        <TodoInput />
        <TodoList />
      </Container>
    </Div>
  );
}

function TodoInput() {
  return (
    <div>
      <input type="text" placeholder="Add Title" />
      <input type="text" placeholder="Add Description" />
      <FaPlus />
    </div>
  );
}

function TodoList() {
  const todos = useSelector((store) => store.todos);
  return (
    <div>
      {todos.length > 0 ? (
        todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)
      ) : (
        <p>No Todo's! Create One!</p>
      )}
    </div>
  );
}

function TodoItem({ todo }) {
  return (
    <div>
      <div>{todo.title}</div>
      <div>{todo.description}</div>
      <div>
        <MdDeleteForever />
      </div>
      <div>{!todo.completed ? <FaCheck /> : ""}</div>
    </div>
  );
}

export default Todo;
