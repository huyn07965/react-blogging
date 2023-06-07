import React from "react";
import styled from "styled-components";
import { Heading } from "../../components";
import { useState } from "react";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import PostItem from "./PostItem";
import { useTranslation } from "react-i18next";

const PostRelatedStyles = styled.div`
  padding-bottom: 20px;
  .heading {
    margin-bottom: 20px;
    color: ${(props) => props.theme.primary};
  }
  .post-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 20px;
  }
  @media screen and (max-width: 1324px) {
    .post-item {
      overflow: auto;
    }
  }
  @media screen and (max-width: 1024px) {
    .heading {
      margin-bottom: 10px;
    }
  }
  @media screen and (max-width: 600px) {
    .post-item {
      flex-wrap: wrap;
      overflow: hidden;
    }
  }
`;
const PostRelated = ({ categoryId = "" }) => {
  const { t } = useTranslation();
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
      <Heading className="heading">{t("related")}</Heading>
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
