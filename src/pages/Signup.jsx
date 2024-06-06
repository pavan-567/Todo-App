import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputContainer from "../features/todo/styles/InputContainer";
import InputDiv from "../features/todo/styles/InputDiv";
import Input from "../features/todo/styles/Input";
import Button from "../features/todo/styles/Button";
import { CreateUser } from "../firebase/auth";
import { auth, db } from "../firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

function Signup() {
  const navigate = useNavigate();
  const userLoggedIn = useSelector((store) => store.auth.userLoggedIn);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userLoggedIn) navigate("/");
  });

  async function handleSubmit() {
    await CreateUser(email, password);
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName,
        lastName,
      });
    }
    navigate("/");
  }

  return (
    <>
      <div style={{ fontSize: "3rem", textAlign: "center" }}>Sign Up</div>
      <div style={{ borderBottom : "2px solid black" }}></div>
      <InputContainer>
        <InputDiv>
          <label htmlFor="">Enter First Name</label>
          <Input
            type="text"
            name=""
            id=""
            onChange={(e) => setFirstName(e.target.value)}
          />
        </InputDiv>

        <InputDiv>
          <label htmlFor="">Enter Last Name</label>
          <Input
            type="text"
            name=""
            id=""
            onChange={(e) => setLastName(e.target.value)}
          />
        </InputDiv>
        <InputDiv>
          <label>Enter Your Email</label>
          <Input
            type="email"
            name="email"
            id=""
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputDiv>
        <InputDiv>
          <label>Enter Password</label>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputDiv>
        <Button
          onClick={handleSubmit}
          disabled={
            firstName.length <= 0 ||
            lastName.length <= 0 ||
            email.length <= 0 ||
            password.length <= 0
          }
        >
          Submit
        </Button>
      </InputContainer>
      <div style={{ margin: "5px 0" }}>
        Already a User? <Link to="/login">Login</Link> Here
      </div>
    </>
  );
}

export default Signup;
