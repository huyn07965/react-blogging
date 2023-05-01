import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import Postmeta from "./Postmeta";
import PostTitle from "./PostTitle";
import slugify from "slugify";

const PostNewestItemsStyles = styled.div`
  padding: 0 20px;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .image {
    width: 180px;
    max-height: 300px;
    border-radius: 10px;
  }
  .content {
    margin-left: 20px;
    flex: 1;
  }
  .content-newest-top {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    margin: 0px 0 10px 0;
  }
  .content-newest-center {
    max-width: 358px;
    margin-bottom: 5px;
  }
  .content-info {
    max-width: 150px;
    font-size: 14px;
    font-weight: 500;
  }
  @media screen and (max-width: 600px) {
    .image {
      width: 120px;
      height: 80px;
      border-radius: 10px;
    }
    .content {
      margin-left: 20px;
      flex: 1;
    }
    .content-newest-top {
      display: inline-block;
      font-size: 10px;
      font-weight: 500;
      border-radius: 8px;
      margin: 0px 0 10px 0;
    }
    .content-newest-center {
      max-width: 358px;
      margin-bottom: 5px;
      font-size: 14px;
    }
    .content-info {
      max-width: 120px;
      font-size: 10px;
      font-weight: 500;
    }
  }
`;

const PostNewestItems = ({ data }) => {
  if (!data.id) return null;
  return (
    <PostNewestItemsStyles>
      <div className="item">
        <PostImage
          newestItems
          className="image"
          url={data.image}
          alt="unplash"
          to={data?.slug}
        ></PostImage>
        <div className="content">
          <PostCategory
            type="secondary"
            className="content-newest-top"
            to={data.category?.slug}
          >
            {data.category?.name}
          </PostCategory>
          <PostTitle
            className="content-newest-center"
            to={data?.slug}
            title={data?.title}
          >
            {data.title?.slice(0, 45) + "..."}
          </PostTitle>
          <Postmeta
            className="content-info"
            author={data.user?.userName}
            to={slugify(data.user?.fullName || "", { lower: true })}
          ></Postmeta>
        </div>
      </div>
    </PostNewestItemsStyles>
  );
};

export default PostNewestItems;
