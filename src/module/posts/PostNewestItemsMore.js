import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import slugify from "slugify";
import { useAuth } from "../../contexts/auth-context";
import SavePost from "../../components/savepost/SavePost";
import { useNavigate } from "react-router-dom";
import useSavePost from "../../hooks/useSavePost";

const PostNewestItemsMoreStyles = styled.div`
  width: 100%;
  .newest-item-more {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  .image {
    width: 240px;
    height: 160px;
    border-radius: 5px;
  }
  .content {
    /* margin-left: 20px; */
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    width: 70%;
    min-height: 160px;
  }
  .content-newest-top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
  }
  .content-newest-center {
    width: 100%;
    font-size: 20px;
    font-weight: 600;
  }
  .content-info {
    font-size: 16px;
  }
  @media screen and (max-width: 600px) {
    .newest-item-more {
      display: block;
    }
    .image {
      width: 100%;
      height: 220px;
      margin-bottom: 15px;
    }
    .content {
      width: 100%;
      min-height: 100px;
      gap: 20px;
    }
    .content-newest-top {
      font-size: 14px;
    }
    .content-newest-center {
      font-size: 16px;
    }
    .content-info {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 400px) {
    .image {
      max-height: 220px;
    }
  }
`;

const PostNewestItemsMore = ({ data }) => {
  const { userInfo, save, setSave } = useAuth();
  const itemLng = localStorage.getItem("lng");
  const navigate = useNavigate();
  const { handleWatchLater, savePost } = useSavePost(data?._id);
  if (!data._id) return null;
  return (
    <PostNewestItemsMoreStyles>
      <div className="newest-item-more">
        <PostImage
          newestItems
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
              data={data._id}
            ></SavePost>
          </div>
          <PostTitle
            className="content-newest-center"
            to={data?.slug}
            title={itemLng === "vn" ? data?.title : data?.titleEN}
          >
            {data.title?.length > 100 ? (
              <>
                {itemLng === "vn"
                  ? data.title?.slice(0, 100) + "..."
                  : data?.titleEN?.slice(0, 100) + "..."}
              </>
            ) : (
              <>{itemLng === "vn" ? data?.title : data?.titleEN}</>
            )}
          </PostTitle>
          <PostMeta
            className="content-info"
            author={data.user?.userName}
            date={data.createdAt}
            to={data.user?.id}
          ></PostMeta>
        </div>
      </div>
    </PostNewestItemsMoreStyles>
  );
};

export default PostNewestItemsMore;
