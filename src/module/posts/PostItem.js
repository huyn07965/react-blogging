import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import useViewport from "../../hooks/useViewPort";
import { useAuth } from "../../contexts/auth-context";
import SavePost from "../../components/savepost/SavePost";
import { useNavigate } from "react-router-dom";
import useSavePost from "../../hooks/useSavePost";

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
    margin: 5px 0 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
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
  const { userInfo, save, setSave } = useAuth();
  const itemLng = localStorage.getItem("lng");
  const navigate = useNavigate();
  const { handleWatchLater, savePost } = useSavePost(data._id);
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 600;
  if (!data._id) return null;
  return (
    <PostItemStyles>
      <div className="item">
        <PostImage
          className="image"
          url={data.image}
          alt="unplash"
          to={data?.slug}
        ></PostImage>
        <div className="content">
          <div className="content-newest-top">
            <PostCategory to={data.category?.slug}>
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
              data={data?._id}
            ></SavePost>
          </div>
          {!isMobile ? (
            <PostTitle
              to={data?.slug}
              className="content-newest-center"
              title={itemLng === "vn" ? data?.title : data?.titleEN}
            >
              {itemLng === "vn"
                ? data.title?.slice(0, 45) + "..."
                : data?.titleEN?.slice(0, 45) + "..."}
            </PostTitle>
          ) : (
            <PostTitle
              to={data?.slug}
              className="content-newest-center"
              title={itemLng === "vn" ? data?.title : data?.titleEN}
            >
              {itemLng === "vn"
                ? data.title?.slice(0, 90) + "..."
                : data?.titleEN?.slice(0, 90) + "..."}
            </PostTitle>
          )}
          <PostMeta
            author={data.user?.userName}
            to={data.user?.id}
            date={data?.createdAt}
          ></PostMeta>
        </div>
      </div>
    </PostItemStyles>
  );
};

export default PostItem;
