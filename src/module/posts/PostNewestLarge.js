import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import Postmeta from "./Postmeta";
import PostTitle from "./PostTitle";
import slugify from "slugify";
import useViewport from "../../hooks/useViewPort";
const PostNewestLargeStyles = styled.div`
  .images {
    max-width: 570px;
    height: 375px;
    border-radius: 5px;
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
    font-size: 16px;
  }
  @media screen and (max-width: 600px) {
    .images {
      height: 300px;
    }
    .content-newest-center {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 400px) {
    .images {
      height: 225px;
    }
  }
`;

const PostNewestLarge = ({ data }) => {
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1224 && viewPort.width >= 1024;
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
        {isMobile ? (
          <PostTitle
            className="content-newest-center"
            size="big"
            to={data?.slug}
            title={data.title}
          >
            {data.title.slice(0, 50) + "..."}
          </PostTitle>
        ) : (
          <PostTitle
            className="content-newest-center"
            size="big"
            to={data?.slug}
          >
            {data.title}
          </PostTitle>
        )}
        <Postmeta
          className="content-info"
          author={data.user?.userName}
          date={data.createdAt?.seconds}
          to={slugify(data.user?.fullName || "", { lower: true })}
        ></Postmeta>
      </div>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
