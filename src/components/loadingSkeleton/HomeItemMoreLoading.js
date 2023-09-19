import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";

const HomeItemMoreLoadingStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .main {
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

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
  .categoryList {
    display: flex;
    justify-content: flex-start;
    gap: 15px;
    flex-wrap: wrap;
    width: 30%;
    padding: 30px;
  }
`;

const HomeItemMoreLoading = () => {
  return (
    <HomeItemMoreLoadingStyles>
      <div className="main">
        <div className="body">
          <div className="image-post">
            <Skeleton width={240} height={130}></Skeleton>
          </div>
          <div className="info-post">
            <div className="category">
              <Skeleton width={120} height={25}></Skeleton>
              <div>
                <Skeleton width={25} height={25}></Skeleton>
              </div>
            </div>
            <Skeleton width={460} height={20} count={2}></Skeleton>
            <Skeleton width={150} height={20}></Skeleton>
          </div>
        </div>
        <div className="body">
          <div className="image-post">
            <Skeleton width={240} height={130}></Skeleton>
          </div>
          <div className="info-post">
            <div className="category">
              <Skeleton width={120} height={25}></Skeleton>
              <Skeleton width={25} height={25}></Skeleton>
            </div>
            <Skeleton width={460} height={20} count={2}></Skeleton>
            <Skeleton width={150} height={20}></Skeleton>
          </div>
        </div>
        <div className="body">
          <div className="image-post">
            <Skeleton width={240} height={130}></Skeleton>
          </div>
          <div className="info-post">
            <div className="category">
              <Skeleton width={120} height={25}></Skeleton>
              <Skeleton width={25} height={25}></Skeleton>
            </div>
            <Skeleton width={460} height={20} count={2}></Skeleton>
            <Skeleton width={150} height={20}></Skeleton>
          </div>
        </div>
      </div>
      <div className="categoryList">
        <Skeleton width={80} height={25}></Skeleton>
        <Skeleton width={120} height={25}></Skeleton>
        <Skeleton width={120} height={25}></Skeleton>
        <Skeleton width={80} height={25}></Skeleton>
        <Skeleton width={80} height={25}></Skeleton>
        <Skeleton width={80} height={25}></Skeleton>
        <Skeleton width={80} height={25}></Skeleton>
        <Skeleton width={80} height={25}></Skeleton>
      </div>
    </HomeItemMoreLoadingStyles>
  );
};

export default HomeItemMoreLoading;
