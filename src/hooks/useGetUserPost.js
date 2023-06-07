import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";

export default function useGetUserPost(userId) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = doc(db, "users", userId);
      const singleDoc = await getDoc(colRef);
      setUser(singleDoc?.data());
    }
    getData();
  }, [userId]);
  return {
    user,
  };
}
