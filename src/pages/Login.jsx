import { useEffect, useState } from "react";
import InputContainer from "../features/todo/styles/InputContainer";
import InputDiv from "../features/todo/styles/InputDiv";
import Input from "../features/todo/styles/Input";
import Button from "../features/todo/styles/Button";
import { SignIn } from "../firebase/auth";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      try {
        await SignIn(email, password);
        toast.success("Successfully Logged In!");
      } catch (err) {
        toast.error("Invalid Credentials");
      }
    }
    setEmail("");
    setPassword("");
    navigate("/");
  }

  return (
    <>
      {!userLoggedIn ? (
        <>
          <div style={{ fontSize: "3rem", textAlign: "center" }}>Login</div>
          <div style={{ borderBottom: "2px solid black" }}></div>

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
            <Button
              onClick={login}
              disabled={email.length <= 3 || password.length <= 3}
            >
              Submit
            </Button>
          </InputContainer>
          <div style={{ textAlign: "center", marginTop: "5px" }}>
            New User? <Link to="/signup">Sign Up</Link> Here
          </div>
        </>
      ) : (
        <p>Loading Login Screen....</p>
      )}
    </>
  );
}

export default Login;
