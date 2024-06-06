import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function fetchTodos(id) {
  // const querySnapshot = await getDocs(collection(db, "todos"));
  const data = [];
  const q = query(collection(db, "todos"), where("user", "==", id));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
      createdAt: { ...doc.data().createdAt },
      updatedAt: { ...doc.data().updatedAt },
    });
  });

  // querySnapshot.forEach((doc) => {
  //   if ({ ...doc.data() }.user === id)
  //     data.push({
  //       id: doc.id,
  //       ...doc.data(),
  //       createdAt: { ...doc.data().createdAt },
  //       updatedAt: { ...doc.data().updatedAt },
  //     });
  // });
  return data;
}
