import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
const TextareaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    padding: 16px 20px;
    background-color: ${(props) => props.theme.greyLight};
    border: 1px solid transparent;
    border-radius: 8px;
    transition: all 0.2s linear;
    color: ${(props) => props.theme.black};
    font-size: 14px;
    resize: none;
    min-height: 200px;
  }
  textarea::-webkit-input-placeholder {
    color: #b2b3bd;
  }
  textarea::-moz-input-placeholder {
    color: #b2b3bd;
  }
  textarea:focus {
    border-color: ${(props) => props.theme.primary};
    background-color: white;
  }
`;

const Textarea = ({
  name = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextareaStyles>
      <textarea id={name} type={type} {...field} {...props} />
    </TextareaStyles>
  );
};

export default Textarea;
