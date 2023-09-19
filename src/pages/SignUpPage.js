import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Field,
  Input,
  InputPasswordToogle,
  Label,
} from "../components";
import slugify from "slugify";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useAuth } from "../contexts/auth-context";

const SignUpStyles = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.greenLight};
  .container {
    max-width: 1000px;
    border-radius: 5px;
    background-color: #fff;
    padding: 40px 30px;
    box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  }
  .logo {
    max-width: 100px;
    margin: 0 auto;
    margin-bottom: 40px;
  }
  .form {
    width: 100%;
  }
  .content {
    width: 100%;
    display: flex;
    gap: 30px;
    margin-bottom: 40px;
    Input {
      width: 100%;
    }
  }
  .have-account {
    margin-bottom: 25px;
    a {
      display: inline-block;
      font-weight: 500;
      color: ${(props) => props.theme.primary};
    }
  }
  @media screen and (max-width: 600px) {
    padding: 0;
    .container {
      padding: 40px 20px;
    }
    .content {
      flex-wrap: wrap;
      gap: 0;
    }
  }
`;
// const schema = yup.object({
//   fullName: yup.string().required("Please enter your full name"),
//   userName: yup
//     .string()
//     .required("Please enter your user name")
//     .max(9, "Your username must be less than 10 characters"),
//   email: yup
//     .string()
//     .required("Please enter your email address")
//     .email("Please enter valid email address"),
//   password: yup
//     .string()
//     .required("Please enter your password")
//     .min(8, "Your password must be least 8 characters"),
// });
const SignUpPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema)
    defaultValues: {
      avatar: "/user.jpg",
      email: "",
      fullName: "",
      userName: "",
      password: "",
      slug: "",
      role: 3,
      status: 1,
      description: "",
      watchLater: [],
      likePost: [],
      follow: [],
      follower: [],
      // createdAt: new Date(),
    },
  });
  const [password, setPassword] = useState("");
  const handlePassChange = (value) => {
    setPassword(value);
  };
  const handleSignUp = async (values) => {
    if (!isValid) return;

    if (values.fullName && values.userName && values.email) {
      if (password.length < 8) {
        toast.error(`${t("validPass")}`);
      } else {
        const newValues = { ...values };
        newValues.slug = slugify(values.slug || values.fullName, {
          lower: true,
        });
        newValues.status = Number(newValues.status);
        newValues.password = password;
        try {
          await axios
            .post(baseUrl.creteUser, newValues)
            .then((result) => {
              console.log(result);
              toast.success(`${t("toastCreateUser")}`);
              navigate("/sign-in");
            })
            .catch((err) => {
              console.log(err.response);
              toast.error(`${err.response.data}`);
            });
        } catch (erorr) {
          toast.error(`${t("toastCreateCategory")}`);
        } finally {
          reset({
            avatar: "/user.jpg",
            email: "",
            fullName: "",
            userName: "",
            password: "",
            slug: "",
            role: 3,
            status: 1,
            description: "",
            watchLater: [],
            likePost: [],
            follow: [],
            follower: [],
          });
          setPassword("");
        }
      }
    } else {
      toast.error(`${t("toastSignIn")}`);
    }
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
  // if (userInfo) {
  //   navigate("/");
  // }
  useEffect(() => {
    document.title = "Register Page";
  });
  return (
    <SignUpStyles>
      <div className="container">
        <Link to="/">
          <img srcSet="/logo.png 2x" alt="" className="logo" />
        </Link>
        <form
          className="form"
          onSubmit={handleSubmit(handleSignUp)}
          autoComplete="off"
        >
          <div className="content">
            <Field>
              <Label htmlFor="fullName">{t("fullName")}</Label>
              <Input
                placeholder={t("fullNamePlace")}
                type="text"
                name="fullName"
                control={control}
              />
            </Field>
            <Field>
              <Label htmlFor="userName">{t("userName")}</Label>
              <Input
                placeholder={t("userNamePlace")}
                type="text"
                name="userName"
                control={control}
              />
            </Field>
          </div>
          <div className="content">
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
              <InputPasswordToogle
                control={control}
                value={password}
                onChange={handlePassChange}
              ></InputPasswordToogle>
            </Field>
          </div>
          <div className="have-account">
            {t("titleAlreadyAccount")}{" "}
            <NavLink to="/sign-in">{t("titleLogin")}</NavLink>
          </div>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            style={{ maxWidth: 300, margin: "0 auto" }}
          >
            {t("signUp")}
          </Button>
        </form>
      </div>
    </SignUpStyles>
  );
};

export default SignUpPage;
