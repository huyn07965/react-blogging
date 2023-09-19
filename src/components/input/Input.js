import React from "react";
import { useController } from "react-hook-form";
import styled, { css } from "styled-components";

const InputStyles = styled.div`
  position: relative;
  width: 100%;
  .input {
    padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
    width: 100%;
    font-weight: 500px;
    border: 1px solid transparent;
    border-radius: 5px;
    transition: all 0.2s linear;
    background-color: ${(props) => props.theme.greyLight};
    ${(props) =>
      props.disabled === true &&
      css`
        opacity: 0.5;
        pointer-events: none;
      `};
  }
  .input:focus {
    border-color: ${(props) => props.theme.primary};
    background-color: white;
  }
  .input::-webkit-input-placeholder {
    color: #c4c4c4;
  }
  .input::-moz-input-placeholder {
    color: #c4c4c4;
  }
  .input::-ms-reveal {
    display: none !important;
  }
  .icon-eye {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
const Input = ({
  name = "",
  control,
  type = "",
  children,
  className = "",
  disabled = false,
  // value,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputStyles disabled={disabled} hasIcon={children ? true : false}>
      <input
        className="input"
        id={name}
        type={type}
        // value={value}
        {...field}
        {...props}
      />
      {children}
    </InputStyles>
  );
};

export default Input;
