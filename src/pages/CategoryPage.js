import React, { useEffect, useState } from "react";
import { Layout, LayoutCategory } from "../components";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useGetCategory from "../hooks/useGetCategory";
const CategoryPageStyles = styled.div``;

const CategoryPage = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fetchData();
  }, [params.slug]);
  const [name] = posts;
  const { category } = useGetCategory(name?.category?.id);
  useEffect(() => {
    document.title = "Category Page";
  });
  if (posts?.length <= 0) return null;
  return (
    <Layout>
      <CategoryPageStyles>
        <LayoutCategory post={posts} title={category?.name}></LayoutCategory>
      </CategoryPageStyles>
    </Layout>
  );
};

export default CategoryPage;
