import React from "react";
import styled from "styled-components";
import { Layout, LayoutCategory } from "../components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/constants";

const BlogPageStyles = styled.div`
  @media screen and (max-width: 600px) {
    margin-top: -40px;
  }
`;

const BlogPage = () => {
  const [post, setPost] = useState([]);
  const [filter, setFilter] = useState({
    likeFilter: "",
    viewFilter: "",
    categoryFilter: "",
  });
  const [loading, setLoading] = useState(true);

  const handleGetFilter = (value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...value,
    }));
  };

  useEffect(() => {
    setLoading(false);
    if (
      filter.categoryFilter === "" &&
      filter.likeFilter === "" &&
      filter.viewFilter === ""
    ) {
      async function fetchAllData() {
        await axios
          .get(baseUrl.getAllPost)
          .then((result) => {
            setPost(result.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
      fetchAllData();
    } else {
      async function fetchData() {
        await axios
          .get(
            `https://node-app-blogging.onrender.com/postFilter?category=${filter.categoryFilter}&sortByLike=${filter.likeFilter}&sortByView=${filter.viewFilter}`
          )
          .then((result) => {
            setPost(result.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
      fetchData();
    }
    // const data = localStorage.getItem("filter");
    // const storedFilter = JSON.parse(data);
    // console.log("data filter", storedFilter);
  }, [filter]);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  useEffect(() => {
    document.title = "Blog Page";
  });
  return (
    <BlogPageStyles>
      <Layout>
        <LayoutCategory
          post={post}
          title="Blog"
          getFilter={handleGetFilter}
          checkFilter={true}
          loading={loading}
        ></LayoutCategory>
      </Layout>
    </BlogPageStyles>
  );
};

export default BlogPage;
