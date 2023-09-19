import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import slugify from "slugify";

const PostFeatureItemStyles = styled.div`
  .image {
    position: relative;
    max-width: 360px;
    min-width: 360px;
    max-height: 270px;
    border-radius: 15px;
    margin-bottom: 20px;
  }
  .image-item {
    height: 270px;
    width: 100%;
    border-radius: 15px;
    object-fit: cover;
  }
  .post-overlay {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.75);
    mix-blend-mode: multiply;
    opacity: 0.6;
  }
  .content {
    width: 100%;
    position: absolute;
    padding: 15px 10px 10px 20px;
    top: 0;
  }
  .content-top {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: #fff;
    white-space: nowrap;
  }
  .content-info {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    width: 300px;
    /* padding: 0 10px 0 70px; */
  }
  .conent-bottom {
    font-size: 22px;
    font-weight: 500;
    line-height: 28px;
    color: #fff;
  }
  @media screen and (max-width: 1150px) {
    .image {
      max-height: 200px;
      min-width: 200px;
    }
    .image-item {
      height: 200px;
    }
    .content-info {
      display: none;
    }
  }
`;
const PostFeatureItem = ({ data }) => {
  const { category, user } = data;
  if (!data || !data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostFeatureItemStyles>
      <div className="feature-item">
        <div className="image">
          <PostImage
            className="image-item"
            url={data.image}
            alt="unplash"
            to={data?.slug}
          ></PostImage>
          <div className="content">
            <div className="content-top">
              <PostCategory to={category.slug}>{category?.name}</PostCategory>
              <PostMeta
                author={user?.userName}
                // to={slugify(user?.fullName || "", { lower: true })}
                to={user._id}
                date={formatDate}
                colors
                className="content-info"
              ></PostMeta>
            </div>
            <PostTitle to={data.slug} size="big" colors title={data.title}>
              {data.title}
            </PostTitle>
          </div>
        </div>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
