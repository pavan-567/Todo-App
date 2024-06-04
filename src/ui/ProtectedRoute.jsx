import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const user = useSelector((store) => store.username);
  if (user) navigate("/");
  return children;
}

export default ProtectedRoute;
