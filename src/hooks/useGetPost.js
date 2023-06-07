import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";

export default function useGetPost(userId, search) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "posts");
      const newSearch = search
        ? query(
            colRef,
            where("title", ">=", search),
            where("title", "<=", search + "utf8")
          )
        : query(colRef, where("user.id", "==", userId));
      onSnapshot(newSearch, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostList(result);
      });
    }
    getData();
  }, [userId, search]);
  return {
    postList,
  };
}
