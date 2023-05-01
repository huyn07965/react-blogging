import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import Postmeta from "./Postmeta";
import PostTitle from "./PostTitle";
import slugify from "slugify";

const PostItemStyles = styled.div`
  .image {
    width: 270px;
    height: 202px;
    display: flex;
    align-items: center;
    border-radius: 10px;
  }
  .content {
    padding: 20px 0;
  }
  .content-newest-top {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    margin: 0px 0 10px 0;
  }
  .content-newest-center {
    max-width: 267px;
    margin-bottom: 5px;
  }
  .content-info {
    max-width: 180px;
  }
  .content-newest-circle {
    width: 6px;
    height: 6px;
    border-radius: 50px;
    background-color: ${(props) => props.theme.greyDark};
  }
`;

const PostItem = ({ data }) => {
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!data || !data.id) return null;
  return (
    <PostItemStyles>
      <div className="item">
        <PostImage
          className="image"
          url={data.image}
          alt="unplash"
          to={data.slug}
        ></PostImage>
        <div className="content">
          <PostCategory to={data.category?.slug} className="content-newest-top">
            {data?.category?.name}
          </PostCategory>
          <PostTitle
            to={data.slug}
            className="content-newest-center"
            title={data?.title}
          >
            {data.title?.slice(0, 20) + "..."}
          </PostTitle>
          <Postmeta
            author={data?.user?.userName}
            to={slugify(data?.user?.fullName || "", { lower: true })}
            date={formatDate}
            className="content-info"
          ></Postmeta>
        </div>
      </div>
    </PostItemStyles>
  );
};

export default PostItem;
