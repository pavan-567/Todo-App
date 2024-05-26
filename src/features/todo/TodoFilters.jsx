import { useDispatch, useSelector } from "react-redux";
import { completedAll, filterTodos, removeAllTodos } from "./todoSlice";
import FilterContainer from "./styles/FilterContainer";
import Button from "./styles/Button";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

function TodoFilters() {
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.todos);
  const todosLength = todos?.length;
  return (
    <FilterContainer>
      <select
        name=""
        id=""
        defaultValue="ALL"
        onChange={(e) => {
          dispatch(filterTodos(e.target.value));
        }}
      >
        <option value="ALL">All</option>
        <option value="COMPLETED">Completed Tasks</option>
        <option value="PENDING">Pending Tasks</option>
      </select>
      <Button
        onClick={async () => {
          // dispatch(completedAll());
          for (const todo of todos) {
            await updateDoc(doc(db, "todos", todo.id), {
              completed: true,
              updatedAt: serverTimestamp(),
            });
          }
        }}
        disabled={todosLength <= 0}
      >
        Mark All As Completed
      </Button>
      <Button
        onClick={async () => {
          // dispatch(removeAllTodos())
          for (const todo of todos) {
            await deleteDoc(doc(db, "todos", todo.id));
          }
        }}
        disabled={todosLength <= 0}
      >
        Remove All Tasks
      </Button>
    </FilterContainer>
  );
}

export default TodoFilters;
