import React from "react";
import styled from "styled-components";
import Button from "../button/Button";
const FooterStyles = styled.div`
  width: 100%;
  min-height: 220px;
  background-color: ${(props) => props.theme.greyLight};
  padding: 20px;
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
  return (
    <FooterStyles>
      <div className="container">
        <div className="footer">
          <h3>Blogging</h3>
          <p>Address: An Phu Dong, District 12</p>
          <p>Mail: huyn07965@gmail.com</p>
          <p>Phone: 0365113450</p>
        </div>
        <div className="footer">
          <h3>Infomation</h3>
          <p>Company</p>
          <p>CEO</p>
          <p>About Us</p>
        </div>
        <div className="footer">
          <h3>Account</h3>
          <p>Sign In</p>
          <p>Sign Up</p>
          <p>Support</p>
        </div>
        <div className="footer">
          <h3>Contact</h3>
          <p>
            All inquiries, please contact us <br></br>via the input box below
          </p>
          <div className="input-contact">
            <input type="text" name="lh" placeholder="input your text" />
            <Button className="button-contact">Send</Button>
          </div>
        </div>
      </div>
    </FooterStyles>
  );
};

export default Footer;
