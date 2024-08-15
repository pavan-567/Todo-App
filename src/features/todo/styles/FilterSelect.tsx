import { TodoFilter } from "../types/Filter";

export default function FilterSelect({ selectedFilter, onChange }) {
  return (
    <select
      value={selectedFilter}
      onChange={(e) => onChange(e.target.value as TodoFilter)}
    >
      {Object.values(TodoFilter).map((filter) => (
        <option key={filter} value={filter}>
          {filter}
        </option>
      ))}
    </select>
  );
}
