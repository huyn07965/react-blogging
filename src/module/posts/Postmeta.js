import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostmetaStyles = styled.div`
  color: #6b6b6b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  .content-circle {
    width: 6px;
    height: 6px;
    border-radius: 50px;
    background-color: #6b6b6b;
    ${(props) =>
      props.colors === true &&
      css`
        background-color: #fff;
      `};
  }
`;
const Postmeta = ({
  date = "Mar 23",
  author = "Andiez Le",
  className = "",
  colors = false,
  to = "",
}) => {
  return (
    <PostmetaStyles className={className} colors={colors} to={to}>
      <span className="content-date">{date}</span>
      <div className="content-circle"></div>
      <NavLink to={`/user/${to}`}>
        <span className="content-name">{author}</span>
      </NavLink>
    </PostmetaStyles>
  );
};

export default Postmeta;
