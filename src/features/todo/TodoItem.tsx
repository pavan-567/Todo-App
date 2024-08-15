import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp, FaCheck, FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editTodoId, modifyTodo, removeTodo } from "./todoSlice";
import StatusDiv from "./styles/StatusDiv";
import Item from "./styles/Item";

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const completed = todo.completed ? true : false;
  const [open, setOpen] = useState(() => (completed ? false : true));

  useEffect(() => {
    if (completed) setOpen(false);
  }, [completed]);

  return (
    <Item>
      <div>
        <div id="title">{todo.title}</div>
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
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div>
            <MdDelete
              className="icon"
              onClick={() => dispatch(removeTodo(todo.id))}
            />
          </div>
          <div>
            {!todo.completed ? (
              <FaCheck
                className="icon"
                onClick={() => {
                  dispatch(modifyTodo(todo.id));
                }}
              />
            ) : (
              <IoClose
                className="icon"
                onClick={() => {
                  dispatch(modifyTodo(todo.id));
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
        <StatusDiv $complete={completed}>
          {completed ? "completed" : "pending"}
        </StatusDiv>
      </div>
    </Item>
  );
}

export default TodoItem;
