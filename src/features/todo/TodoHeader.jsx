import { FcTodoList } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import Header from "./styles/Header";
import CompletedDiv from "./styles/CompletedDiv";
import { SignOut } from "../../firebase/auth";
import { reset } from "./todoSlice";
import Button from "./styles/Button";

function TodoHeader() {
  const todos = useSelector((store) => store.todos.todos);
  const completedTodos = todos.filter((todo) => todo.completed === true);
  const { status, userDetails } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  async function logout() {
    await SignOut();
    dispatch(reset());
  }

  if (status === "loading") return <div>Loading....</div>;
  const { firstName, lastName } = userDetails;
  const fullName = firstName + " " + lastName;
  return (
    <Header>
      {/* <div
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
      </div> */}
      <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
        <FcTodoList />
        <div style={{ fontWeight: "bold" }}>Todo</div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "3px",
          flexDirection: "column",
          fontSize: "10px",
        }}
      >
        <div>
          Welcome <span style={{ fontWeight: "bold" }}>{fullName}</span>
        </div>
        <div
          style={{
            alignSelf: "flex-end",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={logout}
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
