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
    width: 72%;
    margin: 0 auto;
  }
  .images {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .title {
    width: 100%;
    margin: 10px auto;
  }
  .content-heading {
    font-size: 36px;
    font-weight: 600;
    line-height: 48px;
    color: ${(props) => props.theme.primary};
    margin: 20px 0;
  }
  .info-post {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  .content-center {
    max-width: 820px;
    margin: 30px auto;
  }
  .content-info {
    font-size: 15px;
    font-weight: 600;
  }
  /* .image-chapter {
    height: 500px;
    border-radius: 20px;
  } */
  /* .image-description {
    display: block;
    text-align: center;
    margin: 20px auto;
    width: 520px;
    font-size: 16px;
    color: ${(props) => props.theme.greyDark};
    font-weight: 300;
  } */
  @media screen and (max-width: 1024px) {
    .content-top {
      width: 100%;
    }
    .images {
      width: 100%;
    }
    .content-center {
      margin: 0 auto;
    }
  }
  @media screen and (max-width: 600px) {
    .content-heading {
      font-size: 26px;
      line-height: 38px;
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
  return (
    <DetailPageStyles>
      <Layout>
        <div className="container">
          <div className="content-top">
            <div className="title">
              <PostTitle className="content-heading" to={postInfo?.slug}>
                {postInfo?.title}
              </PostTitle>
              <div className="info-post">
                <PostCategory
                  to={postInfo.category?.slug}
                  className="content-newest-top"
                >
                  {postInfo?.category?.name}
                </PostCategory>
                <Postmeta
                  author={postInfo?.user?.userName}
                  className="content-info"
                  to={slugify(postInfo?.user?.fullName || "", { lower: true })}
                  date={postInfo.createdAt?.seconds}
                ></Postmeta>
              </div>
            </div>
            <PostImage
              className="images"
              url={postInfo?.image}
              alt="unplash"
            ></PostImage>
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
      </Layout>
    </DetailPageStyles>
  );
};

export default DetailPage;
