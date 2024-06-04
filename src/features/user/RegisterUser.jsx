import React, { useEffect, useState } from "react";
import Input from "../todo/styles/Input";
import InputDiv from "../todo/styles/InputDiv";
import SubmitButton from "../todo/styles/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../todo/todoSlice";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.username);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  function handleRegister() {
    dispatch(setName(username));
    setUsername("");
    navigate("/");
  }

  return (
    <>
      <div style={{ fontSize: "30px", textAlign: "center" }}>Register</div>
      <InputDiv>
        <label htmlFor="">Enter Your Name</label>
        <Input
          type="text"
          placeholder="Enter Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputDiv>
      <SubmitButton onClick={handleRegister} style={{ alignSelf: "center" }}>
        Register
      </SubmitButton>
    </>
  );
}

export default RegisterUser;
