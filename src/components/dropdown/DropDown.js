import React from "react";
import styled from "styled-components";
import { DropdownProvider } from "./dropdown-context";
const DropDownStyles = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  .dropdown {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #e7ecf3;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
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

const DropDown = ({ children, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <DropDownStyles>{children}</DropDownStyles>
    </DropdownProvider>
  );
};

export default DropDown;
