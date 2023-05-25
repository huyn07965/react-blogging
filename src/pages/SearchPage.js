import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";
import { useSearchParams } from "react-router-dom";
import { Layout, LayoutCategory } from "../components";
import styled from "styled-components";
import slugify from "slugify";

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
  const [post, setPost] = useState([]);
  const textSearch = params.get("title");
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      onSnapshot(colRef, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        if (textSearch <= 0) return;
        const postSearch = result.filter((value) => {
          const values = slugify(value.title, {
            lower: true,
            replacement: " ",
            trim: true,
          });
          return values.toUpperCase().includes(textSearch.toUpperCase());
        });
        setPost(postSearch);
      });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textSearch]);

  return (
    <SearchPageStyles>
      <Layout>
        {post?.length <= 0 ? (
          <div className="container">
            <h2>Data Not Found</h2>
            <img
              className="image-not-found"
              src="/Search-Cristina.jpg"
              alt="not-fond"
            />
          </div>
        ) : (
          <LayoutCategory
            post={post}
            title={`tìm kiếm ${textSearch}`}
          ></LayoutCategory>
        )}
      </Layout>
    </SearchPageStyles>
  );
};

export default SearchPage;
