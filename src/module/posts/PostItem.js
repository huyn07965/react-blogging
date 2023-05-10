import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import Postmeta from "./Postmeta";
import PostTitle from "./PostTitle";
import slugify from "slugify";
import useViewport from "../../hooks/useViewPort";

const PostItemStyles = styled.div`
  .image {
    width: 270px;
    height: 180px;
    display: flex;
    align-items: center;
    border-radius: 5px;
  }
  .content {
    padding: 20px 0;
  }
  .content-newest-top {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    margin: 5px 0 15px 0;
  }
  .content-newest-center {
    max-width: 267px;
    margin: 5px 0 15px 0;
  }
  .content-newest-circle {
    width: 6px;
    height: 6px;
    border-radius: 50px;
    background-color: ${(props) => props.theme.greyDark};
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    .image {
      width: 100%;
      height: 220px;
    }
    .content-newest-center {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 400px) {
    .image {
      max-height: 220px;
    }
  }
`;

const PostItem = ({ data }) => {
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 600;
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
          {!isMobile ? (
            <PostTitle
              to={data.slug}
              className="content-newest-center"
              title={data?.title}
            >
              {data.title?.slice(0, 50) + "..."}
            </PostTitle>
          ) : (
            <PostTitle
              to={data.slug}
              className="content-newest-center"
              title={data?.title}
            >
              {data.title?.slice(0, 90) + "..."}
            </PostTitle>
          )}
          <Postmeta
            author={data?.user?.userName}
            to={slugify(data?.user?.fullName || "", { lower: true })}
            date={data?.createdAt?.seconds}
          ></Postmeta>
        </div>
      </div>
    </PostItemStyles>
  );
};

export default PostItem;
