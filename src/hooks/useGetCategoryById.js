import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/constants";

export default function useGetCategoryById(categoryId) {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    async function getData() {
      axios
        .get(baseUrl.getCategoryById + categoryId)
        .then((result) => {
          setCategory(result.data);
        })
        .catch((err) => console.log(err));
    }
    getData();
  }, [categoryId]);
  return {
    category,
  };
}
