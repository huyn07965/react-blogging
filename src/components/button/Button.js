import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import LoadingSpinner from "../loading/LoadingSpinner";
const ButtonStyles = styled.button`
  cursor: pointer;
  line-height: 27px;
  font-weight: bold;
  padding: 0 25px;
  font-size: 18px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.height || "55px"};
  border-radius: 5px;
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: #fff;
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const Button = ({
  type = "button",
  onClick = () => {},
  to,
  kind = "primary",
  children,
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to != null && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyles type={type} kind={kind} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

export default Button;
