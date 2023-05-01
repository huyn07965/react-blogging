import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Layout } from "../components";
import {
  PostCategory,
  PostImage,
  Postmeta,
  PostRelated,
  PostTitle,
} from "../module";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";
import NotFoundPage from "./NotFoundPage";
import { useParams } from "react-router-dom";
import slugify from "slugify";
import Author from "../components/author/Author";

const DetailPageStyles = styled.div`
  .content-top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    padding-bottom: 20px;
  }
  .images {
    max-width: 550px;
    width: 100%;
    height: 470px;
    border-radius: 20px;
    background-color: #00a7b4;
  }
  .content-newest-top {
    display: inline-block;
    margin-bottom: 25px;
  }
  .content-right {
    margin-left: 20px;
  }
  .content-heading {
    font-size: 36px;
    font-weight: 600;
    line-height: 48px;
    color: ${(props) => props.theme.primary};
    margin-bottom: 20px;
  }
  .content-info {
    max-width: 190px;
  }
  .content-center {
    max-width: 820px;
    margin: 30px auto;
  }
  .image-chapter {
    height: 500px;
    border-radius: 20px;
  }
  .image-description {
    display: block;
    text-align: center;
    margin: 20px auto;
    width: 520px;
    font-size: 16px;
    color: ${(props) => props.theme.greyDark};
    font-weight: 300;
  }
  .post-item {
    padding-top: 20px;
    display: grid;
    grid-template-columns: repeat(4, 280px);
    column-gap: 10px;
  }
  @media screen and (max-width: 1024px) {
    .content-top {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;
    }
    .images {
      max-width: 100%;
    }
    .content-right {
      width: 100%;
      margin: 30px 0 10px 0;
    }
    .content-center {
      margin: 0 auto;
    }
  }
`;

const DetailPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() &&
            setPostInfo({
              id: doc.id,
              ...doc.data(),
            });
        });
      });
    }
    fetchData();
  }, [slug]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  useEffect(() => {
    document.title = "Detail Page";
  });
  if (!slug) return <NotFoundPage></NotFoundPage>;
  if (!postInfo.title) return null;
  const date = postInfo?.createdAt?.seconds
    ? new Date(postInfo?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <DetailPageStyles>
      <Layout></Layout>
      <div className="container">
        <div className="content-top">
          <PostImage
            className="images"
            url={postInfo?.image}
            alt="unplash"
          ></PostImage>
          <div className="content-right">
            <PostCategory
              to={postInfo.category?.slug}
              className="content-newest-top"
            >
              {postInfo?.category?.name}
            </PostCategory>
            <PostTitle className="content-heading">{postInfo?.title}</PostTitle>
            <Postmeta
              author={postInfo?.user?.fullName}
              to={slugify(postInfo?.user?.fullName || "", { lower: true })}
              date={formatDate}
              className="content-info"
            ></Postmeta>
          </div>
        </div>
        <div className="content-center">
          <div
            className="entry-content"
            dangerouslySetInnerHTML={{
              __html: postInfo?.content || "",
            }}
          ></div>
          <Author userId={postInfo?.user?.id}></Author>
        </div>
        <PostRelated categoryId={postInfo?.category?.id}></PostRelated>
      </div>
    </DetailPageStyles>
  );
};

export default DetailPage;
