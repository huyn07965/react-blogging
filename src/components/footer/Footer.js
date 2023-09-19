import React from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const FooterStyles = styled.div`
  width: 100%;
  min-height: 220px;
  background-color: ${(props) => props.theme.greyLight};
  padding: 20px;
  Link {
    cursor: pointer;
  }
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
  }
  .footer {
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    h3 {
      font-size: 20px;
      font-weight: 600;
      color: ${(props) => props.theme.primary};
    }
    p {
      font-weight: 400;
    }
  }
  .footerLast {
    max-width: 320px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    h3 {
      font-size: 20px;
      font-weight: 600;
      color: ${(props) => props.theme.primary};
    }
    p {
      font-weight: 400;
    }
  }
  .input-contact {
    display: flex;
    gap: 5px;
    input {
      border-radius: 5px;
      padding: 0 15px;
      max-width: 200px;
    }
  }
  .button-contact {
    max-height: 40px;
  }
  @media screen and (max-width: 600px) {
    .button-contact {
      font-size: 14px;
      max-width: 70px;
    }
  }
`;
const Footer = () => {
  const { t } = useTranslation();
  return (
    <FooterStyles>
      <div className="container">
        <div className="footer">
          <h3>Blogging</h3>
          <p>{t("address")}: An Phu Dong, District 12</p>
          <p>{t("email")}: huyn07965@gmail.com</p>
          <p>{t("phone")}: 0365113450</p>
        </div>
        <div className="footer">
          <h3>{t("info")}</h3>
          <Link to="/contact">{t("company")}</Link>
          <Link>{t("rule")}</Link>
          <Link to="/contact">{t("about")}</Link>
        </div>
        <div className="footer">
          <h3>{t("account")}</h3>
          <Link to="/sign-in">{t("signIn")}</Link>
          <Link to="/sign-up">{t("signUp")}</Link>
          <Link to="/reset-pass">{t("resetPass")}</Link>
        </div>
        <div className="footerLast">
          <h3>{t("contact")}</h3>
          <p>{t("contactText")}</p>
          <div className="input-contact">
            <input type="text" name="lh" placeholder={t("inputContact")} />
            <Button className="button-contact">{t("send")}</Button>
          </div>
        </div>
      </div>
    </FooterStyles>
  );
};

export default Footer;
