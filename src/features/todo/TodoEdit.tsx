import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { IRootStore } from "../../store";
import Input from "./styles/Input";
import InputContainer from "./styles/InputContainer";
import InputDiv from "./styles/InputDiv";
import Item from "./styles/Item";
import { editTodo, removeEditMode } from "./todoSlice";
import Todo from "./types/Todo";

function TodoEdit() {
  const {title, description}: Todo = useSelector((store: IRootStore) =>
    store.todos?.find((todo: Todo) => todo.id === store.editTodo)
  ) as Todo; // Always Returns TODO

  const dispatch = useDispatch();

  const [editTitle, setEditTitle] = useState(function () {
    return title;
  });

  const [editDescription, setEditDescription] = useState(() => description);

  return (
    <>
      <Item direction="col">
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            marginTop: "5px",
          }}
        >
          Edit Todo
        </div>
        <div
          style={{
            borderBottom: "2px solid black",
          }}
        ></div>
        <InputContainer>
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
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </InputDiv>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
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
        </InputContainer>
      </Item>
    </>
  );
}

export default TodoEdit;
