import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import DropDown from "../dropdown/DropDown";
const TranslateStyles = styled.div`
  .language {
    display: inline-block;
    padding: 10px 20px;
    background-color: ${(props) => props.theme.blueLight};
    position: relative;
  }
  .translate {
    width: 100px;
    height: 20px;
    background-color: ${(props) => props.theme.primary};
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    display: none;
    :hover {
      display: block;
    }
  }
`;

const Translate = () => {
  const { i18n } = useTranslation();
  const translateVn = () => {
    i18n.changeLanguage("vn");
    localStorage.setItem("lng", "vn");
    localStorage.setItem(
      "img",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNddsrksy5aSSjysVM_Kw7BtPLv1_guSg--fq2nwv6uQ&s"
    );
  };
  const translateEn = () => {
    i18n.changeLanguage("en");
    localStorage.setItem("lng", "en");
    localStorage.setItem(
      "img",
      "https://vuongquocanh.com/wp-content/uploads/2018/04/la-co-vuong-quoc-anh.jpg"
    );
  };
  return (
    <TranslateStyles>
      <DropDown translate="translate">
        <DropDown.Select
          placeholder={localStorage.getItem("lng") || "en"}
          image={
            localStorage.getItem("img") ||
            "https://vuongquocanh.com/wp-content/uploads/2018/04/la-co-vuong-quoc-anh.jpg"
          }
          translate="translate"
        ></DropDown.Select>
        <DropDown.List>
          <DropDown.Options
            language={localStorage.getItem("lng") || "en"}
            translate="translate"
            onClick={translateVn}
          >
            vn
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNddsrksy5aSSjysVM_Kw7BtPLv1_guSg--fq2nwv6uQ&s"
              alt="vn"
            />
          </DropDown.Options>
          <DropDown.Options
            language={localStorage.getItem("lng") || "en"}
            translate="translate"
            onClick={translateEn}
          >
            en
            <img
              src="https://vuongquocanh.com/wp-content/uploads/2018/04/la-co-vuong-quoc-anh.jpg"
              alt="en"
            />
          </DropDown.Options>
        </DropDown.List>
      </DropDown>
    </TranslateStyles>
  );
};

export default Translate;
