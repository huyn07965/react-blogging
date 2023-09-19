import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useDropdown } from "./dropdown-context";

const OptionsStyles = styled.div`
  .option {
    padding: 16px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${(props) => props.theme.greyLight};
    ${(props) =>
      props.translate &&
      css`
        padding: 6px 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 8px;
      `};
    &:hover {
      background-color: ${(props) => props.theme.greenLight};
    }
    img {
      object-fit: cover;
      max-width: 20px;
      height: 15px;
    }
  }
  .activeClass {
    background-color: ${(props) => props.theme.greenLight};
  }
`;
const Options = ({
  onClick = "",
  translate = "",
  language = "en",
  ...props
}) => {
  const [tesst, setTesst] = useState(false);
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };

  return (
    <OptionsStyles translate={translate} language={language}>
      <div
        className={`option ${
          props?.children[0] == language ? "activeClass" : ""
        }`}
        // className="option"
        onClick={handleClick}
      >
        {props.children}
      </div>
    </OptionsStyles>
  );
};

export default Options;
