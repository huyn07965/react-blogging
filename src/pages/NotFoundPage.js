import React from "react";
import styled from "styled-components";
import { Button } from "../components";
import { useEffect } from "react";
const NotFoundPageStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0;
  row-gap: 50px;
  .image {
    max-width: 600px;
    max-height: 400px;
    width: 100%;
    height: 100%;
  }
  .image-404 {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cotent {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    row-gap: 20px;
  }
  h2 {
    font-size: 34px;
    font-weight: 800;
    color: #143e6f;
  }
  p {
    font-size: 20px;
    font-weight: 400;
    color: #143e6f;
  }
  @media screen and (max-width: 1024px) {
    padding: 50px 20px;

    h2 {
      font-size: 28px;
    }
    p {
      font-size: 14px;
      text-align: center;
    }
    .home-back {
      font-size: 14px;
      padding: 0 15px;
      height: 35px;
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
        <img
          className="image-404"
          src="https://porr-group.com/fileadmin/g_Media/Page_not_found.png"
          alt="404"
        />
      </div>
      <div className="cotent">
        <h2>Page Not Found</h2>
        <p>We are sorry but the page you are looking for does not exist.</p>
        <Button to="/">Home Back</Button>
      </div>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
