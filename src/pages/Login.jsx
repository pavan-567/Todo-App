import { useEffect, useState } from "react";
import InputContainer from "../features/todo/styles/InputContainer";
import InputDiv from "../features/todo/styles/InputDiv";
import Input from "../features/todo/styles/Input";
import Button from "../features/todo/styles/Button";
import { onAuthStateChanged } from "firebase/auth";
import { SignIn } from "../firebase/auth";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const userLoggedIn = useSelector((store) => store.auth.userLoggedIn);

  useEffect(() => {
    if (userLoggedIn) navigate("/");
  });

  async function login() {
    if (!isLogin) {
      setIsLogin(true);
      await SignIn(email, password);
    }
    navigate("/");
  }

  return (
    <>
      <div style={{ fontSize: "3rem" }}>Login</div>
      <hr />
      <InputContainer>
        <InputDiv>
          <label>Enter Email</label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputDiv>
        <InputDiv>
          <label>Enter Password</label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputDiv>
        <Button onClick={login}>Submit</Button>
      </InputContainer>
      <div>
        New User? <Link to="/signup">Sign Up</Link> Here
      </div>
    </>
  );
}

export default Login;
