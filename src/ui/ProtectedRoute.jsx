import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { userLoggedIn } = useSelector((store) => store.auth);
  return userLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
