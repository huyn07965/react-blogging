import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";

const HomeFeatureLoadingStyles = styled.div`
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
const HomeFeatureLoading = () => {
  return (
    <HomeFeatureLoadingStyles>
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
    </HomeFeatureLoadingStyles>
  );
};

export default HomeFeatureLoading;
