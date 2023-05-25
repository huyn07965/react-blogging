import React from "react";
import styled from "styled-components";
import { Layout } from "../components";
import { HomeBanner, HomeFeature, HomeNewest } from "../module";

const HomePageStyles = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyles>
      <Layout className="layout">
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
