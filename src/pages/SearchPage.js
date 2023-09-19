import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BlogLoading, Layout, LayoutCategory } from "../components";
import styled from "styled-components";
import useSearch from "../hooks/useSearch";
import axios from "axios";
import { baseUrl } from "../utils/constants";

const SearchPageStyles = styled.div`
  .image-not-found {
    width: 800px;
    height: 600px;
    margin: 0 auto;
  }
  h2 {
    color: ${(props) => props.theme.primary};
    padding-top: 20px;
    text-align: center;
  }
  @media screen and (max-width: 600px) {
    .image-not-found {
      max-height: 400px;
    }
  }
`;
const SearchPage = () => {
  const [params] = useSearchParams();
  const textSearch = params.get("title");
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl.getAllPost)
        .then((result) => {
          setPost(result.data);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [textSearch]);

  const { dataSearch, loading } = useSearch(post, textSearch);

  if (dataSearch.length <= 0)
    return (
      <SearchPageStyles>
        <Layout>
          <div className="container">
            <h2>Data Not Found</h2>
            <img
              className="image-not-found"
              src="/Search-Cristina.jpg"
              alt="not-fond"
            />
          </div>
        </Layout>
      </SearchPageStyles>
    );

  return (
    <SearchPageStyles>
      <Layout>
        {loading ? (
          <div className="container">
            <BlogLoading></BlogLoading>
          </div>
        ) : (
          <LayoutCategory
            post={dataSearch}
            title={`tìm kiếm ${textSearch}`}
            showFilter={false}
          ></LayoutCategory>
        )}
      </Layout>
    </SearchPageStyles>
  );
};

export default SearchPage;
