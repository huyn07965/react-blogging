import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import Postmeta from "./Postmeta";
import PostTitle from "./PostTitle";
import slugify from "slugify";
import useViewport from "../../hooks/useViewPort";

const PostNewestItemsStyles = styled.div`
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .image {
    width: 180px;
    height: 130px;
    border-radius: 5px;
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
  @media screen and (max-width: 600px) {
    .image {
      width: 120px;
      height: 80px;
    }
    .content-newest-top {
      font-size: 10px;
    }
    .content-newest-center {
      max-width: 358px;
      font-size: 14px;
    }
    @media screen and (max-width: 400px) {
      .content-info {
        font-size: 10px;
      }
    }
  }
`;

const PostNewestItems = ({ data }) => {
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 400;
  if (!data.id) return null;
  return (
    <PostNewestItemsStyles>
      <div className="item">
        <PostImage
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
          {!isMobile ? (
            <PostTitle
              className="content-newest-center"
              to={data?.slug}
              title={data?.title}
            >
              {data.title?.slice(0, 45) + "..."}
            </PostTitle>
          ) : (
            <PostTitle
              className="content-newest-center"
              to={data?.slug}
              title={data?.title}
            >
              {data.title?.slice(0, 30) + "..."}
            </PostTitle>
          )}

          <Postmeta
            author={data.user?.userName}
            date={data.createdAt?.seconds}
            className="content-info"
            to={slugify(data.user?.fullName || "", { lower: true })}
          ></Postmeta>
        </div>
      </div>
    </PostNewestItemsStyles>
  );
};

export default PostNewestItems;
