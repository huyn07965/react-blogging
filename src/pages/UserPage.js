import React, { useEffect, useState } from "react";
import { Layout, LayoutCategory } from "../components";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useGetUserPost from "../hooks/useGetUserPost";
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
        // setUserId(results);
      });
    }
    fetchData();
  }, [params.slug]);
  const [name] = posts;
  const { user } = useGetUserPost(name?.user?.id);
  useEffect(() => {
    document.title = "User Blog Page";
  });
  if (posts?.length <= 0) return null;
  return (
    <Layout>
      <CategoryPageStyles>
        <LayoutCategory
          post={posts}
          title={`${user?.fullName}`}
        ></LayoutCategory>
      </CategoryPageStyles>
    </Layout>
  );
};

export default UserPage;
