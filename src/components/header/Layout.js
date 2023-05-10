import React from "react";
import Header from "./Header";
import styled from "styled-components";
import Footer from "../footer/Footer";
const LayoutStyles = styled.div`
  .hidden-class {
    height: 90px;
    width: 100%;
  }
  @media screen and (max-width: 600px) {
    .hidden-class {
      height: 120px;
    }
  }
`;
const Layout = ({ children }) => {
  return (
    <LayoutStyles>
      <Header></Header>
      <div className="hidden-class"></div>
      {children}
      <Footer></Footer>
    </LayoutStyles>
  );
};

export default Layout;
