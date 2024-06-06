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
  const userDetails = useSelector((store) => store.auth.userDetails);

  const dispatch = useDispatch();

  async function logout() {
    await SignOut();
    dispatch(reset());
  }

  const { firstName, lastName } = userDetails;
  const fullName = firstName + " " + lastName;
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
          Welcome <span style={{ fontWeight: "bold" }}>{fullName}</span>{" "}
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
    </Header>
  );
}

export default TodoHeader;
