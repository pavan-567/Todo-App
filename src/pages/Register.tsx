import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputContainer from "../features/todo/styles/InputContainer";
import RegisterUser from "../features/user/RegisterUser";
import { IRootStore } from "../store";

function Register() {
  const user: string | null = useSelector((store: IRootStore) => store.username);
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
