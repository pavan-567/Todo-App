import { useDispatch, useSelector } from "react-redux";
import { filterTodos } from "./todoSlice";
import FilterContainer from "./styles/FilterContainer";
import Button from "./styles/Button";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/firebase";
import { useQueryClient } from "@tanstack/react-query";

function TodoFilters() {
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.todos.todos);
  const filter = useSelector((store) => store.todos.filter);
  const editMode = useSelector((store) => store.todos.editTodo);
  const [taskStatus, setTaskStatus] = useState(() => filter);
  const queryClient = useQueryClient();

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
        disabled={todosLength <= 0 || editMode}
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
            queryClient.invalidateQueries(["todos"]);
          }
        }}
        disabled={todosLength <= 0 || editMode}
      >
        Mark All As Completed
      </Button>
      <Button
        onClick={async () => {
          for (const todo of todos) {
            await deleteDoc(doc(db, "todos", todo.id));
          }
          queryClient.invalidateQueries(["todos"]);
        }}
        disabled={todosLength <= 0 || editMode}
      >
        Remove All Tasks
      </Button>
    </FilterContainer>
  );
}

export default TodoFilters;
