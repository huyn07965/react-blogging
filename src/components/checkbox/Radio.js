import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
const RadioStyles = styled.label`
  .body {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: medium;
    cursor: pointer;
  }
  .boder-radio {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.greyLight};
    border-radius: 50px;
  }
  .radio {
    width: 20px;
    height: 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
  }
  .radio-active {
    background-color: ${(props) => props.theme.primary};
  }
  .hidden-input {
    visibility: hidden;
  }
`;

const Radio = ({
  checked,
  children,
  name,
  control,
  disabled = false,
  ...rest
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <RadioStyles>
      <input
        checked={checked}
        type="radio"
        className="hidden-input"
        disabled={disabled}
        {...field}
        {...rest}
      />
      <div className="body">
        <div className="boder-radio">
          <div className={`radio ${checked ? "radio-active" : ""}`}></div>
        </div>
        <span>{children}</span>
      </div>
    </RadioStyles>
  );
};

export default Radio;
