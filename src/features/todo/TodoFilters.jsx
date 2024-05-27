import { useDispatch, useSelector } from "react-redux";
import { filterTodos } from "./todoSlice";
import FilterContainer from "./styles/FilterContainer";
import Button from "./styles/Button";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";

function TodoFilters() {
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.todos);
  const filter = useSelector((store) => store.filter);
  const [taskStatus, setTaskStatus] = useState(() => filter);

  const todosLength = todos?.length;

  return (
    <FilterContainer>
      <select
        name=""
        id=""
        value={taskStatus}
        onChange={(e) => {
          dispatch(filterTodos(e.target.value));
          setTaskStatus(e.target.value);
        }}
      >
        <option value="ALL">All</option>
        <option value="COMPLETED">Completed Tasks</option>
        <option value="PENDING">Pending Tasks</option>
      </select>
      <Button
        onClick={async () => {
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
