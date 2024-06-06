import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { fetchTodos } from "../utils/todos";

function useFetchTodos(userId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(userId),
  });

  return { data, isLoading };
}

export default useFetchTodos;
