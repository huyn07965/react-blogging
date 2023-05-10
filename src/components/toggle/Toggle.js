import React from "react";
import styled from "styled-components";
const ToggleStyles = styled.label`
  .toggle {
    display: inline-block;
    width: 92px;
    height: 50px;
    position: relative;
    padding: 4px;
    cursor: pointer;
    border-radius: 50px;
    transition: all;
    background-color: ${(props) => props.theme.greyLight};
  }
  .toggle-active {
    background-color: ${(props) => props.theme.primary};
  }
  .toggle-span {
    width: 42px;
    height: 42px;
    background-color: #fff;
    display: inline-block;
    border-radius: 50px;
    transition: all;
  }
  .toggle-span-active {
    transform: translateX(42px);
  }
  .hidden-input {
    visibility: hidden;
  }
`;
const Toggle = (props) => {
  const { on, onClick, ...rest } = props;
  return (
    <ToggleStyles>
      <input
        type="checkbox"
        checked={on}
        onClick={onClick}
        className="hidden-input"
        onChange={() => {}}
      />
      <div className={`toggle ${on ? "toggle-active" : ""}`} {...rest}>
        <span
          className={`toggle-span ${on ? "toggle-span-active" : ""}`}
        ></span>
      </div>
    </ToggleStyles>
  );
};

export default Toggle;
