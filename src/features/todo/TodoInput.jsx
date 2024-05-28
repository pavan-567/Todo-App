import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import InputContainer from "./styles/InputContainer";
import InputDiv from "./styles/InputDiv";
import Input from "./styles/Input";
import SubmitButton from "./styles/SubmitButton";
import { changeStatus, operation } from "./todoSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

function TodoInput() {
  const dispatch = useDispatch();
  const status = useSelector((store) => store.status);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  async function createTodoAsync() {
    if (title.length > 0 && description.length > 0) {
      dispatch(changeStatus("loading"));
      dispatch(operation("insert"));

      await addDoc(collection(db, "todos"), {
        title,
        description,
        completed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setTitle("");
      setDescription("");
      dispatch(changeStatus("stable"));
      dispatch(changeStatus("retrieve"));
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
          disabled={status === "loading"}
          name="title"
        />
      </InputDiv>
      <InputDiv>
        <label htmlFor="">Enter Description</label>
        <Input
          type="text"
          placeholder="Add Description"
          value={description}
          disabled={status === "loading"}
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
