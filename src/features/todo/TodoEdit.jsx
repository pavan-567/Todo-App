import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, removeEditMode } from "./todoSlice";
import { IoCloseSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import Item from "./styles/Item";
import InputDiv from "./styles/InputDiv";
import Input from "./styles/Input";

function TodoEdit() {
  const { title, description } = useSelector((store) =>
    store.todos.find((todo) => todo.id === store.editTodo)
  );
  const dispatch = useDispatch();

  const [editTitle, setEditTitle] = useState(function () {
    return title;
  });

  const [editDescription, setEditDescription] = useState(() => description);

  return (
    <Item>
      <InputDiv>
        <label htmlFor="">Title</label>
        <Input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
      </InputDiv>
      <InputDiv>
        <label htmlFor="">Description</label>
        <Input
          type="text"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
      </InputDiv>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <button
          onClick={() => {
            if (editTitle.length > 0 && editDescription.length > 0) {
              dispatch(
                editTodo({ title: editTitle, description: editDescription })
              );
            }
          }}
        >
          <FaEdit /> Edit
        </button>
        <button onClick={() => dispatch(removeEditMode())}>
          <IoCloseSharp /> Close
        </button>
      </div>
    </Item>
  );
}

export default TodoEdit;
