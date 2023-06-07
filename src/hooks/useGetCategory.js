import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";

export default function useGetCategory(categoryId) {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = doc(db, "category", categoryId);
      const singleDoc = await getDoc(colRef);
      setCategory(singleDoc?.data());
    }
    getData();
  }, [categoryId]);
  return {
    category,
  };
}
