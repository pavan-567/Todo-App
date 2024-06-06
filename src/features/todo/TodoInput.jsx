import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import InputContainer from "./styles/InputContainer";
import InputDiv from "./styles/InputDiv";
import Input from "./styles/Input";
import SubmitButton from "./styles/SubmitButton";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useQueryClient } from "@tanstack/react-query";

function TodoInput() {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.auth.currentUser?.uid);
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  async function createTodoAsync() {
    if (title.length > 0 && description.length > 0) {

      await addDoc(collection(db, "todos"), {
        title,
        description,
        completed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        user: userId,
      });

      setTitle("");
      setDescription("");
      queryClient.invalidateQueries(["todos"]);
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
