import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function fetchTodos(id) {
  const querySnapshot = await getDocs(collection(db, "todos"));
  const data = [];

  querySnapshot.forEach((doc) => {
    if ({ ...doc.data() }.user === id)
      data.push({
        id: doc.id,
        ...doc.data(),
        createdAt: { ...doc.data().createdAt },
        updatedAt: { ...doc.data().updatedAt },
      });
  });
  return data;
}
