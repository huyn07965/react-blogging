import React, { useEffect, useState } from "react";
import { Layout, LayoutCategory } from "../components";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { baseUrl } from "../utils/constants";

const CategoryPageStyles = styled.div``;

const CategoryPage = () => {
  const [post, setPost] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    likeFilter: "",
    viewFilter: "",
  });

  const handleGetFilter = (value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...value,
    }));
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          `https://node-app-blogging.onrender.com/postFilter?category=${params.slug}&sortByLike=${filter.likeFilter}&sortByView=${filter.viewFilter}`
        )
        .then((result) => {
          setPost(result.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [params.slug, filter]);

  // useEffect(() => {
  //   function componentDidMount() {
  //     const savedFilterState = localStorage.getItem("filterState");
  //     if (savedFilterState) {
  //       const filterState = JSON.parse(savedFilterState);
  //       this.applyFilter(filterState);
  //     }
  //   }
  //   componentDidMount();
  // }, []);

  const [name] = post;
  useEffect(() => {
    document.title = "Category Page";
  });
  if (post?.length <= 0) return null;
  return (
    <Layout>
      <CategoryPageStyles>
        <LayoutCategory
          post={post}
          title={name.category?.name}
          getFilter={handleGetFilter}
          checkFilter={true}
          loading={loading}
          nameCategory={true}
        ></LayoutCategory>
      </CategoryPageStyles>
    </Layout>
  );
};

export default CategoryPage;
