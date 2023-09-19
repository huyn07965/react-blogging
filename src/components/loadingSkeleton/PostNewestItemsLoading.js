import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";

const PostNewestItemsLoadingStyles = styled.div`
  margin-top: -30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 5px;
  .body {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px;
  }
  .image-post {
  }
  .info-post {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .category {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const PostNewestItemsLoading = () => {
  return (
    <PostNewestItemsLoadingStyles>
      <div className="body">
        <div className="image-post">
          <Skeleton width={180} height={130}></Skeleton>
        </div>
        <div className="info-post">
          <div className="category">
            <Skeleton width={120} height={25}></Skeleton>
            <Skeleton width={25} height={25}></Skeleton>
          </div>
          <Skeleton width={320} height={20} count={2}></Skeleton>
          <Skeleton width={150} height={20}></Skeleton>
        </div>
      </div>
      <div className="body">
        <div className="image-post">
          <Skeleton width={180} height={130}></Skeleton>
        </div>
        <div className="info-post">
          <div className="category">
            <Skeleton width={120} height={25}></Skeleton>
            <Skeleton width={25} height={25}></Skeleton>
          </div>
          <Skeleton width={320} height={20} count={2}></Skeleton>
          <Skeleton width={150} height={20}></Skeleton>
        </div>
      </div>
      <div className="body">
        <div className="image-post">
          <Skeleton width={180} height={130}></Skeleton>
        </div>
        <div className="info-post">
          <div className="category">
            <Skeleton width={120} height={25}></Skeleton>
            <Skeleton width={25} height={25}></Skeleton>
          </div>
          <Skeleton width={320} height={20} count={2}></Skeleton>
          <Skeleton width={150} height={20}></Skeleton>
        </div>
      </div>
    </PostNewestItemsLoadingStyles>
  );
};

export default PostNewestItemsLoading;
