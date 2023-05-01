import React from "react";
import styled from "styled-components";
import { Layout } from "../components";
import { HomeBanner, HomeFeature, HomeNewest } from "../module";
import { useEffect } from "react";

const HomePageStyles = styled.div``;

const HomePage = () => {
  useEffect(() => {
    document.title = "Home Page";
  });
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
