import { FcTodoList } from "react-icons/fc";
import { useSelector } from "react-redux";
import Header from "./styles/Header";
import CompletedDiv from "./styles/CompletedDiv";

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
          letterSpacing: "3px",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <FcTodoList />
          <span>Todo</span>
        </span>
      </div>
      <CompletedDiv>
        <div>Completed</div>
        <div>{completedTodos.length}</div>
      </CompletedDiv>
    </Header>
  );
}

export default TodoHeader;
