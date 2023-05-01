import React from "react";
import styled from "styled-components";

const FieldStyles = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0px;
  }
`;
const Field = ({ children }) => {
  return <FieldStyles>{children}</FieldStyles>;
};

export default Field;
