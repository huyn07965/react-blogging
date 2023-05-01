import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import Postmeta from "./Postmeta";
import PostTitle from "./PostTitle";
import slugify from "slugify";
const PostNewestLargeStyles = styled.div`
  .newest {
    margin: 20px auto;
  }
  .images {
    max-width: 570px;
    height: 375px;
    border-radius: 15px;
  }
  .content-newest-top {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    margin: 15px 0;
  }
  .content-newest-center {
    max-width: 570px;
    margin-bottom: 10px;
  }
  .content-info {
    max-width: 150px;
  }
  @media screen and (max-width: 600px) {
    .content-newest-center {
      font-size: 16px;
    }
    .content-info {
      font-size: 14px;
    }
  }
`;

const PostNewestLarge = ({ data }) => {
  if (!data.id) return null;
  return (
    <PostNewestLargeStyles>
      <div className="newest">
        <PostImage
          className="images"
          url={data.image}
          alt="unplash"
          to={data?.slug}
        ></PostImage>
        <PostCategory className="content-newest-top" to={data.category?.slug}>
          {data.category?.name}
        </PostCategory>
        <PostTitle className="content-newest-center" size="big" to={data?.slug}>
          {data.title}
        </PostTitle>
        <Postmeta
          className="content-info"
          author={data.user?.userName}
          to={slugify(data.user?.fullName || "", { lower: true })}
        ></Postmeta>
      </div>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
