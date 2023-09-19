import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/constants";

export default function useGetPostById(id) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl.getPostAuthorId + id)
        .then((result) => setPostList(result.data))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [id]);
  return {
    postList,
  };
}
