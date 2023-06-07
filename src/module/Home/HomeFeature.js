import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Heading } from "../../components";
import { db } from "../../firebase-app/firebase-config";
import PostItem from "../posts/PostItem";
import { useTranslation } from "react-i18next";

const HomeFeatureStyles = styled.div`
  .feature {
    width: 100%;
    margin: 10px auto;
  }
  .title {
    margin-bottom: 20px;
  }
  .content-feature {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 20px;
  }
  @media screen and (max-width: 1324px) {
    .title {
      margin-bottom: 10px;
    }
    .heading {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .content-feature {
      overflow: auto;
    }
  }
  @media screen and (max-width: 600px) {
    .content-feature {
      flex-wrap: wrap;
      overflow: hidden;
    }
  }
`;
const HomeFeature = () => {
  const [post, setPost] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(4)
    );
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPost(results);
    });
  }, []);
  if (post?.length <= 0) return null;
  return (
    <HomeFeatureStyles>
      <div className="container">
        <div className="feature">
          <div className="title">
            <Heading>{t("feature")}</Heading>
          </div>
          <div className="content-feature">
            {post?.map((item) => (
              <PostItem key={item.id} data={item}></PostItem>
            ))}
          </div>
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
