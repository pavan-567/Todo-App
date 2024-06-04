import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import List from "./styles/List";

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
        <div style={{ textAlign: "center", padding: "5px" }}>
          No Todo Items Available!
        </div>
      )}
    </List>
  );
}

export default TodoList;
