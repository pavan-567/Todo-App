import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp, FaCheck, FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editTodoId } from "./todoSlice";
import Item from "./styles/Item";
import { deleteDoc, doc, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useQueryClient } from "@tanstack/react-query";
import StatusDiv from "./styles/StatusDiv";

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const completed = todo.completed ? true : false;
  const [open, setOpen] = useState(() => (completed ? false : true));
  const queryClient = useQueryClient();

  useEffect(() => {
    if (completed) setOpen(false);
  }, [completed]);

  return (
    <Item completed={completed === true ? "true" : "false"}>
      <div>
        <div id="title">{todo.title}</div>
        {open && <div id="description">{todo.description}</div>}
      </div>
      {/*  */}
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          marginTop: "2px",
          gap: "5px",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
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
        <StatusDiv complete={completed ? "true" : "false"}>
          {completed ? "completed" : "pending"}
        </StatusDiv>
      </div>
    </Item>
  );
}

export default TodoItem;
