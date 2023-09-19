import React from "react";
import styled from "styled-components";

const HeadingStyles = styled.div`
  /* margin-bottom: 10px; */
  font-size: 28px;
  font-weight: 600;
  color: ${(props) => props.theme.primary};
  .line-heading {
    background-color: ${(props) => props.theme.blueLight};
    height: 3px;
    width: 50px;
    border-radius: 1px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;

const Heading = ({ children, className = "" }) => {
  return (
    <HeadingStyles className={className}>
      <div className="line-heading"></div>
      {children}
    </HeadingStyles>
  );
};

export default Heading;
