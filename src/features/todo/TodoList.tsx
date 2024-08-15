import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import List from "./styles/List";
import { IRootStore } from "../../store";
import Todo from "./types/Todo";

function TodoList() {
  let todos = useSelector((store: IRootStore) => store.todos);
  let filter = useSelector((store: IRootStore) => store.filter);

  if (filter === "COMPLETED")
    todos = todos.filter((todo: Todo) => todo.completed === true);
  if (filter === "PENDING")
    todos = todos.filter((todo: Todo) => todo.completed === false);

  return (
    <List>
      {todos?.length > 0 ? (
        todos.map((todo: Todo) => <TodoItem todo={todo} key={todo.id} />)
      ) : (
        <div style={{ textAlign: "center", padding: "5px" }}>
          No Todo Items Available!
        </div>
      )}
    </List>
  );
}

export default TodoList;
