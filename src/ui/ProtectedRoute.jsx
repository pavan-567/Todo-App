import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const user = useSelector((store) => store.username);
  return user !== null ? children : <Navigate to="/register" />;
}

export default ProtectedRoute;
