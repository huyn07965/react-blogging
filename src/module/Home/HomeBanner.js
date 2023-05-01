import React from "react";
import styled from "styled-components";
import { Button } from "../../components";

const HomeBannerStyles = styled.div`
  width: 100%;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  padding: 20px 20px;
  margin-top: -15px;
  margin-bottom: 50px;
  .banner {
    width: 100%;
    margin: 0 auto;
    padding: 40px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .banner-left {
    width: 100%;
    max-width: 400px;
    height: 100%;
    color: white;
    line-height: 27px;
  }
  .title-banner {
    font-size: 42px;
    font-weight: 700;
    line-height: 58px;
    margin-bottom: 20px;
  }
  .content-banner {
    font-size: 14px;
    font-weight: 400;
    line-height: 27px;
    margin-bottom: 40px;
  }
  .button-banner {
    max-width: 230px;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 1024px) {
    margin-bottom: 30px;
    padding: 0;
    .banner {
      padding: 20px 20px;
    }
    .title-banner {
      font-size: 22px;
      font-weight: 700;
      line-height: 58px;
      margin-bottom: 10px;
      white-space: nowrap;
    }
    .button-banner {
      max-width: 110px;
      padding: 0 5px;
      height: 35px;
      margin-bottom: 40px;
      font-size: 14px;
    }
  }
  @media screen and (max-width: 650px) {
    margin-bottom: 30px;
    .banner {
      padding: 10px 20px;
    }
    .content-banner {
      display: none;
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-left">
            <h2 className="title-banner">Blogging</h2>
            <p className="content-banner">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Button
              type="button"
              to="/sign-up"
              kind="secondary"
              className="button-banner"
            >
              Get Started
            </Button>
          </div>
          <div className="banner-right">
            <img src="./Illustration.png" className="image-banner" alt="" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
