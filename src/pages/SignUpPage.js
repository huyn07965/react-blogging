import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  Button,
  Field,
  Input,
  InputPasswordToogle,
  Label,
} from "../components";
import slugify from "slugify";

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
const schema = yup.object({
  fullName: yup.string().required("Please enter your full name"),
  userName: yup
    .string()
    .required("Please enter your user name")
    .max(9, "Your username must be less than 10 characters"),
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter valid email address"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Your password must be least 8 characters"),
});
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    // await updateProfile(auth.currentUser, { userName: values.userName });
    toast.success("Register user sucessfully!!");
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      userName: values.userName,
      slug: slugify(values.fullName, {
        lower: true,
        // replacement: "",
        // trim: true,
      }),
      role: 3,
      status: 1,
      avatar: "/user.jpg",
      createdAt: serverTimestamp(),
    });
    navigate("/");
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
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                placeholder="Enter your Name"
                type="text"
                name="fullName"
                control={control}
              />
            </Field>
            <Field>
              <Label htmlFor="userName">User Name</Label>
              <Input
                placeholder="Enter user Name"
                type="text"
                name="userName"
                control={control}
              />
            </Field>
          </div>
          <div className="content">
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
            </Field>
          </div>
          <div className="have-account">
            You already have an account? <NavLink to="/sign-in">Login</NavLink>
          </div>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            style={{ maxWidth: 300, margin: "0 auto" }}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </SignUpStyles>
  );
};

export default SignUpPage;
