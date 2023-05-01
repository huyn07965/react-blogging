import React from "react";
import styled from "styled-components";
import { Layout, LayoutCategory } from "../components";
import { useState } from "react";
import { useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";

const BlogPageStyles = styled.div``;
const BlogPage = () => {
  const [post, setPost] = useState({});
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const dataPost = query(colRef);
      onSnapshot(dataPost, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPost(result);
      });
    }
    fetchData();
  }, []);
  useEffect(() => {
    document.title = "Blog Page";
  });
  return (
    <BlogPageStyles>
      <Layout>
        <LayoutCategory post={post} title="Blog"></LayoutCategory>
      </Layout>
    </BlogPageStyles>
  );
};

export default BlogPage;
