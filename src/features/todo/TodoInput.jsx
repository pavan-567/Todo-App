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
  const editMode = useSelector((store) => store.todos.editTodo);
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
          disabled={editMode}
        />
      </InputDiv>
      <InputDiv>
        <label htmlFor="">Enter Description</label>
        <textarea
          type="text"
          placeholder="Add Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          disabled={editMode}
        />
      </InputDiv>
      <SubmitButton
        onClick={createTodoAsync}
        disabled={title.length <= 3 || description.length <= 3 || editMode}
      >
        <FaPlus /> <span>Add</span>
      </SubmitButton>
    </InputContainer>
  );
}

export default TodoInput;
