import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/constants";

export default function useGetPostCategory(slug) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl.getPostCategory + slug)
        .then((result) => setPostList(result.data))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [slug]);
  return {
    postList,
  };
}
