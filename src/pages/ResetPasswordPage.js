import React, { useEffect, useState } from "react";
import { Button, Input, InputPasswordToogle, Layout } from "../components";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassPageStyles = styled.div`
  .body {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    align-items: center;
    border-radius: 8px;
    background-color: #fff;
    padding: 40px 30px;
    box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
    margin: 20px auto;
  }
  h1 {
    font-size: 30px;
    color: ${(props) => props.theme.primary};
    padding-bottom: 20px;
  }
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    justify-content: flex-start;
  }
  .note {
    width: 50%;
    font-size: 18px;
    color: ${(props) => props.theme.primary};
    margin: 20px auto;
    text-align: center;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
  @media screen and (max-width: 1024px) {
    .body {
      width: 80%;
    }
  }
  @media screen and (max-width: 600px) {
    .body {
      width: 100%;
    }
  }
`;

const PopupStyles = styled.div`
  width: 45%;
  position: fixed;
  top: ${(props) => (props.showPopup ? "50%" : "-100%")};
  left: 50%;
  transform: translate(-50%, ${(props) => (props.showPopup ? "-50%" : "0")});
  background-color: white;
  padding: 40px 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: top 0.5s, transform 0.5s;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
`;
const ChangPassStyles = styled.div`
  width: 45%;
  position: fixed;
  top: ${(props) => (props.showChangePass ? "50%" : "-100%")};
  left: 50%;
  transform: translate(
    -50%,
    ${(props) => (props.showChangePass ? "-50%" : "0")}
  );
  background-color: white;
  padding: 40px 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: top 0.5s, transform 0.5s;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
`;
const ResetPasswordPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
  });
  const { t } = useTranslation();
  const [emailVal, setEmailVal] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const handlePassChange = (value) => {
    setPassword(value);
  };
  const handlePassConfirmChange = (value) => {
    setPasswordConfirm(value);
  };
  const navigate = useNavigate();

  const handleSendEmail = async (values) => {
    const email = values.email;
    setEmailVal(values.email);
    await axios
      .get(baseUrl.sendOtp + email)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setShowPopup(true);
  };

  const handleSendCode = async (values) => {
    const otp = values.code;
    await axios
      .get(
        `https://node-app-blogging.onrender.com/verify-otp?email=${emailVal}&otp=${otp}`
      )
      .then((res) => {})
      .catch((err) => console.log(err));
    setShowPopup(false);
    setShowChangePass(true);
  };
  const handleChangePass = async (values) => {
    // const password = values.confirmPass;
    if (password !== passwordConfirm) {
      toast.error(`${t("changePassErr")}`);
      reset({
        password: "",
        confirmPass: "",
      });
    } else if (password == passwordConfirm) {
      await axios
        .put(
          `https://node-app-blogging.onrender.com/changePass?email=${emailVal}`,
          { password }
        )
        .then((res) => {
          console.log(res);
          toast.success(`${t("changePassErr")}`);
          setShowChangePass(false);
          navigate("/sign-in");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    document.title = "Reset Password Page";
  });
  return (
    <ResetPassPageStyles>
      <Layout>
        <div className="container">
          <div className="body">
            <h1>{t("inputEmail")}</h1>
            <form className="form" onSubmit={handleSubmit(handleSendEmail)}>
              <Input
                placeholder={t("emailPlace")}
                type="email"
                name="email"
                control={control}
              />
              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                style={{ maxWidth: "40%", margin: "0 auto" }}
              >
                {t("send")}
              </Button>
            </form>
          </div>
          <div className="note">
            <p>{t("repSendMail")}</p>
          </div>
          {showPopup && (
            <div onClick={() => setShowPopup(false)} className="overlay"></div>
          )}
          <PopupStyles showPopup={showPopup}>
            <h1>{t("inputCode")}</h1>
            <form className="form" onSubmit={handleSubmit(handleSendCode)}>
              <Input
                placeholder={t("codePlace")}
                type="code"
                name="code"
                control={control}
              />
              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                style={{ maxWidth: "40%", margin: "0 auto" }}
              >
                {t("send")}
              </Button>
            </form>
          </PopupStyles>
          {showChangePass && (
            <div
              // onClick={() => setShowChangePass(false)}
              className="overlay"
            ></div>
          )}
          <ChangPassStyles showChangePass={showChangePass}>
            <h1>{t("changePass")}</h1>
            <form className="form" onSubmit={handleSubmit(handleChangePass)}>
              {/* <Input
                placeholder={t("passPlace")}
                type="password"
                name="password"
                control={control}
              />
              <Input
                placeholder={t("confirmPassPlace")}
                type="confirmPass"
                name="confirmPass"
                control={control}
              /> */}
              <InputPasswordToogle
                control={control}
                value={password}
                onChange={handlePassChange}
              ></InputPasswordToogle>
              <InputPasswordToogle
                control={control}
                value={passwordConfirm}
                onChange={handlePassConfirmChange}
              ></InputPasswordToogle>
              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                style={{ maxWidth: "40%", margin: "0 auto" }}
              >
                {t("send")}
              </Button>
            </form>
          </ChangPassStyles>
        </div>
      </Layout>
    </ResetPassPageStyles>
  );
};

export default ResetPasswordPage;
