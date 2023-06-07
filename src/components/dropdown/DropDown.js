import React from "react";
import styled, { css } from "styled-components";
import { DropdownProvider } from "./dropdown-context";
import { language } from "../../utils/constants";
const DropDownStyles = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  .dropdown {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #e7ecf3;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    padding: 20px;
    ${(props) =>
      props.translate &&
      css`
        padding: 6px 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 10px;
      `};
    img {
      object-fit: cover;
      max-width: 20px;
      height: 15px;
    }
  }
  .icon {
    height: 25px;
    width: 25px;
  }
  .dropdown-item {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: inset;
    z-index: 10;
  }
`;

const DropDown = ({ children, translate = "", className = "", ...props }) => {
  return (
    <DropdownProvider {...props}>
      <DropDownStyles translate={translate}>{children}</DropDownStyles>
    </DropdownProvider>
  );
};

export default DropDown;
