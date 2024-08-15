import { TodoFilter } from "./Filter";
import Todo from "./Todo";

export default interface TodoState {
  todos: Array<Todo>;
  filter: TodoFilter;
  editTodo: string | null;
  username: string | null;
}
