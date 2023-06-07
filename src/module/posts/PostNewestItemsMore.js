import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import Postmeta from "./Postmeta";
import PostTitle from "./PostTitle";
import slugify from "slugify";
import { useAuth } from "../../contexts/auth-context";
import SavePost from "../../components/savepost/SavePost";
import { useNavigate } from "react-router-dom";
import useSavePost from "../../hooks/useSavePost";
import useGetCategory from "../../hooks/useGetCategory";
import useGetUserPost from "../../hooks/useGetUserPost";

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
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const { category } = useGetCategory(data?.category?.id);
  const { user } = useGetUserPost(data?.user?.id);
  const { handleWatchLater, savePost } = useSavePost(data.id);
  if (!data.id) return null;
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
            <PostCategory to={category?.slug}>{category?.name}</PostCategory>
            <SavePost
              onClick={userInfo ? handleWatchLater : () => navigate("/sign-in")}
              savePost={savePost}
              data={data.id}
            ></SavePost>
          </div>
          <PostTitle
            className="content-newest-center"
            to={data?.slug}
            title={data?.title}
          >
            {data.title?.length > 100
              ? data?.title.slice(0, 100) + "..."
              : data?.title}
          </PostTitle>
          <Postmeta
            className="content-info"
            author={user?.userName}
            date={data.createdAt?.seconds}
            to={slugify(user?.slug || "", { lower: true })}
            // to={user?.id}
          ></Postmeta>
        </div>
      </div>
    </PostNewestItemsMoreStyles>
  );
};

export default PostNewestItemsMore;
