import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
const DetailPageLoadingStyles = styled.div`
  .author {
    margin-top: 20px;
  }
  .related-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 20px;
  }
  .item {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .category {
    display: flex;
    justify-content: space-between;
  }
`;
const DetailPageLoading = () => {
  return (
    <DetailPageLoadingStyles>
      <div className="container">
        <div className="content-top">
          <div className="title">
            <div className="content-heading">
              <Skeleton></Skeleton>
            </div>
            <div className="info-post">
              <div className="content-newest-top">
                <Skeleton width={120} height={30}></Skeleton>
              </div>
              <div className="content-info">
                <Skeleton width={220} height={30}></Skeleton>
              </div>
            </div>
          </div>
          <div className="images">
            <Skeleton height={450}></Skeleton>
          </div>
        </div>
        <div className="content-center">
          <div className="entry-content">
            <Skeleton count={15} height={25}></Skeleton>
          </div>
          <div className="author">
            <Skeleton height={200} borderRadius={20}></Skeleton>
          </div>
        </div>
        <div className="related">
          <div className="related-item">
            <div className="item">
              <Skeleton width={270} height={180}></Skeleton>
              <div className="category">
                <Skeleton width={80} height={25}></Skeleton>
                <Skeleton width={20} height={25}></Skeleton>
              </div>
              <Skeleton height={20} count={2}></Skeleton>
              <Skeleton width={150} height={20}></Skeleton>
            </div>
            <div className="item">
              <Skeleton width={270} height={180}></Skeleton>
              <div className="category">
                <Skeleton width={80} height={25}></Skeleton>
                <Skeleton width={20} height={25}></Skeleton>
              </div>
              <Skeleton height={20} count={2}></Skeleton>
              <Skeleton width={150} height={20}></Skeleton>
            </div>
            <div className="item">
              <Skeleton width={270} height={180}></Skeleton>
              <div className="category">
                <Skeleton width={80} height={25}></Skeleton>
                <Skeleton width={20} height={25}></Skeleton>
              </div>
              <Skeleton height={20} count={2}></Skeleton>
              <Skeleton width={150} height={20}></Skeleton>
            </div>
            <div className="item">
              <Skeleton width={270} height={180}></Skeleton>
              <div className="category">
                <Skeleton width={80} height={25}></Skeleton>
                <Skeleton width={20} height={25}></Skeleton>
              </div>
              <Skeleton height={20} count={2}></Skeleton>
              <Skeleton width={150} height={20}></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </DetailPageLoadingStyles>
  );
};

export default DetailPageLoading;
