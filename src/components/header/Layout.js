import React from "react";
import Header from "./Header";
import styled from "styled-components";
const LayoutStyles = styled.div`
  .hidden-class {
    height: 125px;
    width: 100%;
  }
  @media screen and (max-width: 600px) {
    .hidden-class {
      height: 105px;
      width: 100%;
    }
  }
`;
const Layout = ({ children }) => {
  return (
    <LayoutStyles>
      <Header></Header>
      <div className="hidden-class"></div>
      {children}
    </LayoutStyles>
  );
};

export default Layout;
