import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import InputContainer from "./styles/InputContainer";
import InputDiv from "./styles/InputDiv";
import Input from "./styles/Input";
import SubmitButton from "./styles/SubmitButton";
import { createTodo } from "./todoSlice";

function TodoInput() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  return (
    <InputContainer>
      <InputDiv>
        <label htmlFor="">Enter Title</label>
        <Input
          type="text"
          placeholder="Add Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
        />
      </InputDiv>
      <InputDiv>
        <label htmlFor="">Enter Description</label>
        <textarea
          placeholder="Add Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
        />
      </InputDiv>
      <SubmitButton
        onClick={() => {
          if (title.length > 0 && description.length > 0) {
            dispatch(createTodo(title, description));
            setTitle("");
            setDescription("");
            setError("");
          } else {
            let message =
              title.length <= 0 ? "Enter Title" : "Enter Description";
            setError(message);
          }
        }}
        disabled={title.length === 0 || description.length === 0}
      >
        <FaPlus /> <span>Add</span>
      </SubmitButton>
    </InputContainer>
  );
}

export default TodoInput;
