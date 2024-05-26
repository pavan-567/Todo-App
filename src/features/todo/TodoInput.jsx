import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import InputContainer from "./styles/InputContainer";
import InputDiv from "./styles/InputDiv";
import Input from "./styles/Input";
import SubmitButton from "./styles/SubmitButton";
import { changeState, createTodo } from "./todoSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

function TodoInput() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  async function createTodoAsync() {
    if (title.length > 0 && description.length > 0) {
      dispatch(changeState("loading"));

      await addDoc(collection(db, "todos"), {
        title,
        description,
        completed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      dispatch(changeState("stable"));

      setTitle("");
      setDescription("");
    }
  }

  return (
    <InputContainer>
      <InputDiv>
        <label htmlFor="">Enter Title</label>
        <Input
          type="text"
          placeholder="Add Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // onChange={handleInput}
          name="title"
        />
      </InputDiv>
      <InputDiv>
        <label htmlFor="">Enter Description</label>
        <Input
          type="text"
          placeholder="Add Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
        />
      </InputDiv>
      <SubmitButton onClick={createTodoAsync}>
        <FaPlus />
      </SubmitButton>
    </InputContainer>
  );
}

export default TodoInput;
