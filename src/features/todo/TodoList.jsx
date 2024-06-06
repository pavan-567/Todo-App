import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import List from "./styles/List";
import { logout } from "../authentication/authSlice";
import { SignOut } from "../../firebase/auth";
import { reset } from "./todoSlice";

function TodoList() {
  let todos = useSelector((store) => store.todos.todos);
  let filter = useSelector((store) => store.todos.filter);

  if (filter === "COMPLETED")
    todos = todos.filter((todo) => todo.completed === true);
  if (filter === "PENDING")
    todos = todos.filter((todo) => todo.completed === false);

  return (
    <>
      <List>
        {todos?.length > 0 ? (
          todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)
        ) : (
          <p>No Todo Items Available!</p>
        )}
      </List>
    </>
  );
}

export default TodoList;
