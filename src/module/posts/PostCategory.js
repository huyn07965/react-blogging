import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostCategoryStyles = styled.div`
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.greenLight};
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: #fff;
    `};
  color: ${(props) => props.theme.greyDark};
  border-radius: 5px;
  padding: 4px 10px;
  display: inline-block;
  a {
    display: block;
  }
`;
const PostCategory = ({
  children,
  className = "",
  type = "primary",
  to = "",
}) => {
  return (
    <PostCategoryStyles type={type} className={className}>
      <NavLink to={`/category/${to}`}>{children || "none"}</NavLink>
    </PostCategoryStyles>
  );
};

export default PostCategory;
