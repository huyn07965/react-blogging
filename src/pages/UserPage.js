import React, { useEffect, useState } from "react";
import { Layout, LayoutCategory } from "../components";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";
import { useParams } from "react-router-dom";
import styled from "styled-components";
const CategoryPageStyles = styled.div``;

const UserPage = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("user.slug", "==", params.slug)
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
  useEffect(() => {
    document.title = "User Blog Page";
  });
  if (posts?.length <= 0) return null;
  return (
    <Layout>
      <CategoryPageStyles>
        <LayoutCategory
          post={posts}
          title={`các bài viết của ${name.user?.fullName}`}
        ></LayoutCategory>
      </CategoryPageStyles>
    </Layout>
  );
};

export default UserPage;
