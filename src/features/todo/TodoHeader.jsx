import { FcTodoList } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import Header from "./styles/Header";
import CompletedDiv from "./styles/CompletedDiv";
import { removeAll, removeAllTodos, removeName } from "../todo/todoSlice";
import { useNavigate } from "react-router-dom";

function TodoHeader() {
  const todos = useSelector((store) => store.todos);
  // const completedTodos = todos.filter((todo) => todo.completed === true);
  const user = useSelector((store) => store.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Header>
      <div
        style={{
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FcTodoList />
          <span>Todo</span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "3px",
          flexDirection: "column",
          fontSize: "15px",
        }}
      >
        <div>
          Welcome <span style={{ fontWeight: "bold" }}>{user}</span>{" "}
        </div>
        <div
          style={{
            alignSelf: "flex-end",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => {
            dispatch(removeAll());
            navigate("/register");
          }}
        >
          Logout
        </div>
      </div>
      {/* <CompletedDiv>
        <div>Completed</div>
        <div>{completedTodos.length}</div>
      </CompletedDiv> */}
    </Header>
  );
}

export default TodoHeader;
