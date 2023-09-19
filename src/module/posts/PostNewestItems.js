import React, { useState } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import slugify from "slugify";
import useViewport from "../../hooks/useViewPort";
import { useAuth } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import useSavePost from "../../hooks/useSavePost";
import SavePost from "../../components/savepost/SavePost";

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
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  const { userInfo, save, setSave } = useAuth();
  const itemLng = localStorage.getItem("lng");
  const navigate = useNavigate();
  const { handleWatchLater, savePost } = useSavePost(data?._id);
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 400;
  if (!data._id) return null;
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
          <div className="content-newest-top">
            <PostCategory type="secondary" to={data.category?.slug}>
              {itemLng === "vn" ? data.category?.name : data.category?.nameEN}
            </PostCategory>
            <SavePost
              onClick={
                userInfo
                  ? () => {
                      handleWatchLater();
                      setSave(!save);
                    }
                  : () => navigate("/sign-in")
              }
              savePost={savePost}
              data={data._id}
            ></SavePost>
          </div>
          {!isMobile ? (
            <PostTitle
              className="content-newest-center"
              to={data?.slug}
              title={itemLng === "vn" ? data?.title : data?.titleEN}
            >
              {itemLng === "vn"
                ? data.title?.slice(0, 45) + "..."
                : data?.titleEN?.slice(0, 45) + "..."}
            </PostTitle>
          ) : (
            <PostTitle
              className="content-newest-center"
              to={data?.slug}
              title={itemLng === "vn" ? data?.title : data?.titleEN}
            >
              {itemLng === "vn"
                ? data.title?.slice(0, 30) + "..."
                : data?.titleEN?.slice(0, 30) + "..."}
            </PostTitle>
          )}

          <PostMeta
            author={data.user?.userName}
            date={data.createdAt}
            className="content-info"
            to={data.user?.id}
          ></PostMeta>
        </div>
      </div>
    </PostNewestItemsStyles>
  );
};

export default PostNewestItems;
