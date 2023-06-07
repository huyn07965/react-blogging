import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
import {
  Button,
  Field,
  Input,
  InputPasswordToogle,
  Label,
} from "../components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SignInPageStyles = styled.div`
  min-height: 100vh;
  display: flex;
  padding: 30px;
  align-items: center;
  background-color: ${(props) => props.theme.greenLight};
  .container {
    max-width: 1000px;
    display: flex;
    justify-content: space-around;
    border-radius: 5px;
    background-color: #fff;
    padding: 40px 20px;
    box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  }
  .content-left {
    display: flex;
    align-items: center;
  }
  .image-sign-in {
    width: 450px;
    height: 580px;
    opacity: 0.9;
    background-color: black;
  }
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
  .logo {
    max-width: 100px;
    margin: 0 auto;
    margin-bottom: 40px;
  }
  .content-right {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .form {
    max-width: 600px;
  }
  .have-account {
    margin-bottom: 25px;
    a {
      display: inline-block;
      font-weight: 500;
      color: ${(props) => props.theme.primary};
    }
  }
  .error {
    color: red;
    font-size: 16px;
    font-weight: 400;
  }

  @media screen and (max-width: 1024px) {
    .content-left {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    padding: 0;
    .container {
      min-height: 100vh;
    }
  }
`;
const schema = yup.object({
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter valid email address"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Your password must be least 8 characters"),
});
const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSignIn = async (values) => {
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        navigate("/");
        toast.success(`${t("signUpSuccess")}`);
      })
      .catch((error) => {
        setError(true);
      });
  };
  useEffect(() => {
    const arrErros = Object.values(errors);
    if (arrErros.length > 0) {
      toast.error(arrErros[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  return (
    <SignInPageStyles>
      <div className="container">
        <div className="content-left">
          <div className="image-sign-in">
            <img
              src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8Y29udGVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="imagesignin"
              className="image"
            />
          </div>
        </div>
        <div className="content-right">
          <Link to="/">
            <img srcSet="/logo.png 2x" alt="" className="logo" />
          </Link>
          <form
            className="form"
            onSubmit={handleSubmit(handleSignIn)}
            autoComplete="off"
          >
            <Field>
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                placeholder={t("emailPlace")}
                type="email"
                name="email"
                control={control}
              />
            </Field>
            <Field>
              <Label htmlFor="password">{t("pass")}</Label>
              <InputPasswordToogle control={control}></InputPasswordToogle>
              {error && (
                <h3 className="error">
                  Email hoặc mật khẩu không đúng! Vui lòng nhập lại
                </h3>
              )}
            </Field>
            <div className="have-account">
              {t("titleNotAccount")}{" "}
              <NavLink to="/sign-up">{t("titleRegister")}</NavLink>
            </div>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              style={{ maxWidth: 300, margin: "0 auto" }}
            >
              {t("signIn")}
            </Button>
          </form>
        </div>
      </div>
    </SignInPageStyles>
  );
};

export default SignInPage;
