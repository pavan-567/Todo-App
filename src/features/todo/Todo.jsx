import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";
import TodoEdit from "./TodoEdit";
import Container from "./styles/Container";
import Div from "./styles/Div";
import { useSelector } from "react-redux";

// Functionality

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

export default Todo;
