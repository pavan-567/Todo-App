import { useState } from "react";
import { FaCaretDown, FaCaretUp, FaCheck, FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editTodoId } from "./todoSlice";
import Item from "./styles/Item";
import { deleteDoc, doc, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useQueryClient } from "@tanstack/react-query";

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  return (
    <Item>
      <div>
        <div
          id="title"
          style={{
            textDecoration: `${todo.completed ? "line-through" : ""}`,
            textDecorationColor: `${todo.completed ? "green" : ""}`,
          }}
        >
          {todo.title}
        </div>
        {open && <div id="description">{todo.description}</div>}
        {/* <div id="time">Created / Updated at : {todo.updatedAt} </div> */}
      </div>
      {/*  */}
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          marginTop: "2px",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <div></div>
        <div>
          <MdDelete
            className="icon"
            onClick={async () => {
              await deleteDoc(doc(db, "todos", todo.id));
              queryClient.invalidateQueries(["todos"]);
            }}
          />
        </div>
        <div>
          {!todo.completed ? (
            <FaCheck
              className="icon"
              onClick={async () => {
                await updateDoc(doc(db, "todos", todo.id), {
                  completed: true,
                });
                queryClient.invalidateQueries(["todos"]);
              }}
            />
          ) : (
            <IoClose
              className="icon"
              onClick={async () => {
                await updateDoc(doc(db, "todos", todo.id), {
                  completed: false,
                });
                queryClient.invalidateQueries(["todos"]);
              }}
            />
          )}
        </div>
        <div>
          <FaEdit
            className="icon"
            onClick={() => dispatch(editTodoId(todo.id))}
          />
        </div>
        <div>
          {open ? (
            <FaCaretUp className="icon" onClick={() => setOpen(false)} />
          ) : (
            <FaCaretDown className="icon" onClick={() => setOpen(true)} />
          )}
        </div>
      </div>
    </Item>
  );
}

export default TodoItem;
