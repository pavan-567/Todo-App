import { useEffect } from "react";
import InputContainer from "../features/todo/styles/InputContainer";
import RegisterUser from "../features/user/RegisterUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
  const user = useSelector((store) => store.username);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  
  return (
    <InputContainer>
      <RegisterUser />
    </InputContainer>
  );
}

export default Register;
