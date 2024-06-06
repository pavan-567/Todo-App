import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  login,
  logout,
  userDetails,
} from "../features/authentication/authSlice";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function useFetchUser() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const res = await getDoc(doc(db, "Users", user.uid));
        dispatch(userDetails(res.data()));
        dispatch(login({ ...user.providerData[0], uid: user.uid }));
      } else dispatch(logout());
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);
  return loading;
}

export default useFetchUser;
