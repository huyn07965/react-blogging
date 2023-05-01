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
    border-radius: 8px;
    background-color: #fff;
    padding: 40px 20px;
    box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  }
  .content-left {
    display: flex;
    align-items: center;
  }
  .logo {
    margin: 0 auto;
  }
  .content-right {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .heading {
    font-size: 40px;
    font-weight: bold;
    color: ${(props) => props.theme.primary};
    margin-bottom: 30px;
  }
  .form {
    max-width: 600px;
    margin: 0px 20px;
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
    .heading {
      font-size: 26px;
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
        toast.success("Sign in Successfull!");
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
          <Link to="/">
            <img srcSet="/logo.png 2x" alt="" className="logo" />
          </Link>
        </div>
        <div className="content-right">
          <h1 className="heading">Sign In</h1>
          <form
            className="form"
            onSubmit={handleSubmit(handleSignIn)}
            autoComplete="off"
          >
            <Field>
              <Label htmlFor="email">Email Address</Label>
              <Input
                placeholder="Enter your Email"
                type="email"
                name="email"
                control={control}
              />
            </Field>
            <Field>
              <Label htmlFor="password">Password</Label>
              <InputPasswordToogle control={control}></InputPasswordToogle>
              {error && (
                <h3 className="error">
                  Email hoặc mật khẩu không đúng! Vui lòng nhập lại
                </h3>
              )}
            </Field>
            <div className="have-account">
              You have not had an account?{" "}
              <NavLink to="/sign-up">Register an account</NavLink>
            </div>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              style={{ maxWidth: 300, margin: "0 auto" }}
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </SignInPageStyles>
  );
};

export default SignInPage;
