import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostTitleStyles = styled.div`
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
    `};
  ${(props) =>
    props.size === "medium" &&
    css`
      font-size: 14px;
    `};
  ${(props) =>
    props.colors === true &&
    css`
      color: #fff;
    `};
  font-weight: 600;
  line-height: 1.5;
  a {
    display: block;
  }
`;

const PostTitle = ({
  children,
  className = "",
  size = "normal",
  colors = false,
  to = "",
  title = "",
}) => {
  return (
    <PostTitleStyles
      className={className}
      size={size}
      colors={colors}
      title={title}
    >
      <NavLink to={`/${to}`}>{children}</NavLink>
    </PostTitleStyles>
  );
};

export default PostTitle;
