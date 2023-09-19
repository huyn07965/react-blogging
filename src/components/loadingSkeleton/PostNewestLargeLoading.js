import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";

const PostNewestLargeLoadingStyles = styled.div`
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
const PostNewestLargeLoading = () => {
  return (
    <PostNewestLargeLoadingStyles>
      <div className="newest">
        <div className="images">
          <Skeleton width={570} height={375}></Skeleton>
        </div>
        <div className="content-newest-top">
          <Skeleton width={120} height={25}></Skeleton>
          <Skeleton width={25} height={25}></Skeleton>
        </div>
        <Skeleton className="content-newest-center"></Skeleton>
        <Skeleton className="content-newest-center"></Skeleton>
        <Skeleton className="content-info" width={150} height={20}></Skeleton>
      </div>
    </PostNewestLargeLoadingStyles>
  );
};

export default PostNewestLargeLoading;
