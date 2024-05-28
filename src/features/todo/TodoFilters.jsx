import { useDispatch, useSelector } from "react-redux";
import { completedAll, filterTodos, removeAllTodos } from "./todoSlice";
import FilterContainer from "./styles/FilterContainer";
import Button from "./styles/Button";

function TodoFilters() {
  const dispatch = useDispatch();
  const todosLength = useSelector((store) => store.todos.length);
  const filter = useSelector((store) => store.filter);
  return (
    <FilterContainer>
      <select
        name=""
        id=""
        defaultValue={filter}
        onChange={(e) => {
          dispatch(filterTodos(e.target.value));
        }}
      >
        <option value="ALL">All</option>
        <option value="COMPLETED">Completed Tasks</option>
        <option value="PENDING">Pending Tasks</option>
      </select>
      <Button
        onClick={() => dispatch(completedAll())}
        disabled={todosLength <= 0}
      >
        Mark All as Completed
      </Button>
      <Button
        onClick={() => dispatch(removeAllTodos())}
        disabled={todosLength <= 0}
      >
        Remove All Tasks
      </Button>
    </FilterContainer>
  );
}

export default TodoFilters;
