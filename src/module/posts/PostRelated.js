import React from "react";
import styled from "styled-components";
import { Heading } from "../../components";
import { useState } from "react";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import PostItem from "./PostItem";

const PostRelatedStyles = styled.div`
  overflow: auto;
  padding-bottom: 20px;
  .heading {
    margin-bottom: 20px;
    color: ${(props) => props.theme.blueDark};
  }
  @media screen and (max-width: 1024px) {
    .heading {
      margin-bottom: 10px;
    }
  }
`;
const PostRelated = ({ categoryId = "" }) => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("category.id", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPost(result);
    });
  }, [categoryId]);
  if (!categoryId) return null;
  return (
    <PostRelatedStyles>
      <Heading className="heading">Bài viết liên quan</Heading>
      <div>
        <div className="post-item">
          {post?.length > 0 &&
            post?.map((item) => (
              <PostItem key={item.id} data={item}></PostItem>
            ))}
        </div>
      </div>
    </PostRelatedStyles>
  );
};

export default PostRelated;
