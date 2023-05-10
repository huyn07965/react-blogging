import React from "react";
import styled from "styled-components";
const LabelStatusStyles = styled.span`
  display: inline-block;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  &.styleClassName {
    color: ${(props) => props.theme.purpleDark};
    background-color: ${(props) => props.theme.purpleLight};
  }
  &.success {
    color: ${(props) => props.theme.greenDark};
    background-color: ${(props) => props.theme.greenLight};
  }
  &.warning {
    color: ${(props) => props.theme.orangeDark};
    background-color: ${(props) => props.theme.orangeLignt};
  }
  &.danger {
    color: ${(props) => props.theme.redDark};
    background-color: ${(props) => props.theme.redLignt};
  }
`;
const LabelStatus = ({ children, type = "default" }) => {
  let styleClassName = "styleClassName";
  switch (type) {
    case "success":
      styleClassName = "success";
      break;
    case "warning":
      styleClassName = "warning";
      break;
    case "danger":
      styleClassName = "danger";
      break;
    default:
      break;
  }
  return (
    <LabelStatusStyles className={styleClassName}>{children}</LabelStatusStyles>
  );
};

export default LabelStatus;
