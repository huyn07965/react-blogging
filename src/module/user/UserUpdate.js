import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import {
  Button,
  Field,
  ImageUpload,
  Input,
  InputPasswordToogle,
  Label,
  Radio,
  Textarea,
} from "../../components";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl, roleStatus, userStatus } from "../../utils/constants";
import useHandleImage from "../../hooks/useHandleImage";
import { useAuth } from "../../contexts/auth-context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import axios from "axios";

const UserUpdateStyles = styled.div`
  .user-layout {
    display: grid;
    grid-template-columns: repeat(2, 45%);
    column-gap: 40px;
    margin-bottom: 40px;
  }
  .user-avatar {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    background-color: ${(props) => props.theme.greyLight};
  }
  .image-avatar {
    width: 200px;
  }
  .user-layout {
    display: grid;
    grid-template-columns: repeat(2, 45%);
    column-gap: 40px;
    margin-bottom: 40px;
  }
  .radio-user {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .button {
    margin: 0 auto;
    max-width: 250px;
  }
  .title-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .show-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 16px;
    gap: 5px;
  }
  .vn {
    cursor: pointer;
    padding: 5px 20px;
    display: flex;
    align-items: center;
    color: white;
    background-color: ${(props) => props.theme.primary};
    border-radius: 8px;
    ${(props) =>
      props.showContentEn === true &&
      css`
        background-color: ${(props) => props.theme.greyLight};
        color: black;
      `}
  }
  .en {
    cursor: pointer;
    padding: 5px 20px;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.greyLight};
    border-radius: 8px;
    ${(props) =>
      props.showContentEn === true &&
      css`
        background-color: ${(props) => props.theme.primary};
        color: white;
      `}
  }
  .content-vn {
    display: block;
    width: 100%;
    ${(props) =>
      props.showContentEn === true &&
      css`
        display: none;
      `}
  }
  .content-en {
    display: none;
    width: 100%;
    ${(props) =>
      props.showContentEn === true &&
      css`
        display: block;
      `}
  }

  @media screen and (max-width: 600px) {
    .user-layout {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
`;
// const schema = yup.object({
//   fullName: yup.string().required("Please enter full name"),
//   userName: yup
//     .string()
//     .required("Please enter user name")
//     .max(9, "Username must be less than 10 characters"),
//   password: yup
//     .string()
//     .required("Please enter password")
//     .min(8, "Password must be least 8 characters"),
//   slug: yup.string().required("Please enter slug"),
// });
const UserUpdate = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });
  const [params] = useSearchParams();
  const userId = params.get("id");
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [hot, setHot] = useState("");
  const [role, setRole] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEN, setDescriptionEN] = useState("");
  const imageUrl = getValues("avatar");
  const [showContentEn, setShowContentEN] = useState(false);
  // const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  // const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { handleDeleteImage, handleSelectImage, progress, image, setImage } =
    useHandleImage(setValue, getValues);
  const handlePassChange = (value) => {
    setPassword(value);
  };
  useEffect(() => {
    setAvatars(image);
  }, [image]);

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl.getUserById + userId)
        .then((result) => {
          setAvatars(result.data.avatar);
          setEmail(result.data.email);
          setFullName(result.data.fullName);
          setUserName(result.data.userName);
          setPassword(result.data.password);
          setStatus(result.data.status);
          setHot(result.data.hot);
          setRole(result.data.role);
          setSlug(result.data.slug);
          setDescription(result.data.description);
          setDescriptionEN(result.data.descriptionEN);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [userId, reset]);
  console.log("data", description);

  const handleUpdateUser = async (values) => {
    await axios
      .put(baseUrl.updateUser + userId, {
        avatars,
        email,
        fullName,
        userName,
        password,
        status: Number(status),
        hot,
        role: Number(role),
        slug,
        description,
        descriptionEN,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    toast.success(`${t("toastUpdateUser")}`);
    navigate("/manage/user");
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
    document.title = "User Update Page";
  });
  if (!userId) return null;
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <UserUpdateStyles showContentEn={showContentEn}>
      <DashboardHeading
        title={t("updateUser")}
        desc={`${t("updateUserId")} ${userId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="user-avatar">
          <ImageUpload
            className="image-avatar"
            name="image"
            avatar={true}
            image={avatars}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            onChange={handleSelectImage}
          ></ImageUpload>
        </div>
        <div className="user-layout">
          <Field>
            <Label>{t("email")}</Label>
            <Input
              control={control}
              name="email"
              placeholder={t("emailPlace")}
              disabled={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="fullName">{t("fullName")}</Label>
            <Input
              control={control}
              name="fullName"
              placeholder={t("fullNamePlace")}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            ></Input>
          </Field>
        </div>
        <div className="user-layout">
          <Field>
            <Label htmlFor="userName">{t("userName")}</Label>
            <Input
              name="userName"
              control={control}
              placeholder={t("userNamePlace")}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></Input>
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
        <div className="user-layout">
          <Field>
            <Label>{t("status")}</Label>
            <div className="radio-user">
              <Radio
                name="status"
                control={control}
                checked={Number(status) === userStatus.Active}
                value={userStatus.Active}
                onChange={(e) => setStatus(e.target.value)}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(status) === userStatus.Pending}
                value={userStatus.Pending}
                onChange={(e) => setStatus(e.target.value)}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(status) === userStatus.Reject}
                value={userStatus.Reject}
                onChange={(e) => setStatus(e.target.value)}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>{t("role")}</Label>
            <div className="radio-user">
              <Radio
                name="role"
                control={control}
                checked={Number(role) === roleStatus.Admin}
                value={roleStatus.Admin}
                onChange={(e) => setRole(e.target.value)}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(role) === roleStatus.Mod}
                value={roleStatus.Mod}
                onChange={(e) => setRole(e.target.value)}
              >
                Author
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(role) === roleStatus.User}
                value={roleStatus.User}
                onChange={(e) => setRole(e.target.value)}
              >
                User
              </Radio>
            </div>
          </Field>
        </div>
        <div className="user-layout">
          <Field>
            <Label htmlFor="slug">{t("slug")}</Label>
            <Input
              name="slug"
              control={control}
              placeholder={t("slugPlace")}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            ></Input>
          </Field>
          <Field>
            <div className="title-content">
              <Label htmlFor="description">{t("description")}</Label>
              <div className="show-content">
                <div className="vn" onClick={() => setShowContentEN(false)}>
                  VN
                </div>
                <div className="en" onClick={() => setShowContentEN(true)}>
                  EN
                </div>
              </div>
            </div>
            <div className="content-vn">
              <Textarea
                name="description"
                value={description}
                control={control}
                onChange={(e) => setDescription(e.target.value)}
              ></Textarea>
            </div>
            <div className="content-en">
              <Textarea
                name="descriptionEN"
                value={descriptionEN}
                control={control}
                onChange={(e) => setDescriptionEN(e.target.value)}
              ></Textarea>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="button"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {t("updateUser")}
        </Button>
      </form>
    </UserUpdateStyles>
  );
};

export default UserUpdate;
