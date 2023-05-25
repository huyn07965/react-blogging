import React from "react";
import styled from "styled-components";
import { Button } from "../components";
import { useEffect } from "react";
const NotFoundPageStyles = styled.div`
  width: 100%;
  height: 100vh;
  padding-bottom: 40px;
  background-color: #e9fcff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .image {
    object-fit: cover;
    height: 90%;
  }
  .image-404 {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    row-gap: 20px;
  }
  .button-back {
    height: 50px;
  }

  @media screen and (max-width: 1024px) {
    padding: 50px 20px;
    .home-back {
      font-size: 14px;
      padding: 0 15px;
      height: 35px;
    }
  }
  @media screen and (max-width: 1024px) {
    .button-back {
      height: 40px;
      font-size: 16px;
    }
  }
`;

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Not Found Page";
  });
  return (
    <NotFoundPageStyles>
      <div className="image">
        <img className="image-404" src="/not-found.jpg" alt="404" />
      </div>
      <div className="content">
        <Button to="/" className="button-back">
          Home Back
        </Button>
      </div>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
