import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import useViewport from "../../hooks/useViewPort";
import SavePost from "../../components/savepost/SavePost";
import { useAuth } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import useSavePost from "../../hooks/useSavePost";

const PostNewestLargeStyles = styled.div`
  .images {
    max-width: 570px;
    height: 375px;
    border-radius: 5px;
  }
  .content-newest-top {
    margin: 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
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
  const { userInfo, save, setSave } = useAuth();
  const itemLng = localStorage.getItem("lng");
  const navigate = useNavigate();
  const { handleWatchLater, savePost } = useSavePost(data?._id);
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1224 && viewPort.width >= 1024;
  if (!data._id) return null;
  return (
    <PostNewestLargeStyles>
      <div className="newest">
        <PostImage
          className="images"
          url={data.image}
          alt="unplash"
          to={data?.slug}
        ></PostImage>
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
            data={data._id}
          ></SavePost>
        </div>
        {isMobile ? (
          <PostTitle
            className="content-newest-center"
            size="big"
            to={data?.slug}
            title={itemLng === "vn" ? data?.title : data?.titleEN}
          >
            {itemLng === "vn"
              ? data.title?.slice(0, 50) + "..."
              : data?.titleEN?.slice(0, 50) + "..."}
          </PostTitle>
        ) : (
          <PostTitle
            className="content-newest-center"
            size="big"
            to={data?.slug}
            title={itemLng === "vn" ? data?.title : data?.titleEN}
          >
            {itemLng === "vn"
              ? data.title?.slice(0, 85) + "..."
              : data?.titleEN?.slice(0, 85) + "..."}
          </PostTitle>
        )}
        <PostMeta
          className="content-info"
          author={data.user?.userName}
          date={data.createdAt}
          to={data.user?.id}
        ></PostMeta>
      </div>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
