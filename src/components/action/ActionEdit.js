import React from "react";
import styled from "styled-components";

const ActionEditStyles = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid ${props => props.theme.grey6B};;
    border-radius: 4px;
    cursor: pointer;
    .icon{
      width: 20px;
      height: 20px;
    }
`
const ActionEdit = ({ onClick = () => {} }) => {
  return (
    <ActionEditStyles onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </ActionEditStyles>
  );
};

export default ActionEdit;