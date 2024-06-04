import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  stopLoading,
  userDetails,
} from "../features/authentication/authSlice";
import { auth, db } from "../firebase/firebase";
import { Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { loading, userLoggedIn } = useSelector((store) => store.auth);
  const userId = useSelector((store) => store.auth.currentUser?.uid);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({ ...user.providerData[0], uid: user.uid }));
      } else {
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function getUserDetails(uId) {
      const res = await getDoc(doc(db, "Users", uId));
      dispatch(userDetails(res.data()));
      dispatch(stopLoading());
    }
    if (userId) {
      getUserDetails(userId);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  return userLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
