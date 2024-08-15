import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./styles/Button";
import FilterContainer from "./styles/FilterContainer";
import FilterSelect from "./styles/FilterSelect";
import { completedAll, filterTodos, removeAllTodos } from "./todoSlice";
import { TodoFilter } from "./types/Filter";
import { IRootStore } from "store";


function TodoFilters() {
  const dispatch = useDispatch();
  const todosLength: number = useSelector(
    (store: IRootStore) => store.todos.length
  );

  const preservedFilter = useSelector((store: IRootStore) => store.filter);
  const [filter, setFilter] = useState<TodoFilter>(preservedFilter);

  const editMode: string | null = useSelector(
    (store: IRootStore) => store.editTodo
  );

  function handleFilterChange(newFilter: TodoFilter) {
    setFilter(newFilter);
    dispatch(filterTodos(newFilter));
  }

  return (
    <FilterContainer>
      <FilterSelect selectedFilter={filter} onChange={handleFilterChange} />
      <Button
        onClick={() => dispatch(completedAll())}
        disabled={todosLength <= 0 || editMode !== null}
      >
        Mark All as Completed
      </Button>
      <Button
        onClick={() => dispatch(removeAllTodos())}
        disabled={todosLength <= 0 || editMode !== null}
      >
        Remove All Tasks
      </Button>
    </FilterContainer>
  );
}

export default TodoFilters;
