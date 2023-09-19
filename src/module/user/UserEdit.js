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
  Layout,
  Textarea,
} from "../../components";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useHandleImage from "../../hooks/useHandleImage";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/auth-context";
import axios from "axios";
import { baseUrl } from "../../utils/constants";

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
    object-fit: cover;
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

const UserEdit = () => {
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
  const imageUrl = getValues("avatar");
  const [descriptionEN, setDescriptionEN] = useState("");
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
    navigate(`/userinfo?id=${userInfo._id}`);
  };
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
  return (
    <UserUpdateStyles showContentEn={showContentEn}>
      <Layout>
        <div className="container">
          <DashboardHeading
            title={t("userAccount")}
            desc={t("editAccount")}
          ></DashboardHeading>
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <div className="user-avatar">
              <ImageUpload
                className="image-avatar"
                avatar={true}
                name="image"
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
                  // disabled={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
              </Field>
              <Field>
                <Label>{t("fullName")}</Label>
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
                <Label>{t("userName")}</Label>
                <Input
                  name="userName"
                  control={control}
                  placeholder={t("userNamePlace")}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                ></Input>
              </Field>
              <Field>
                <Label>{t("pass")}</Label>
                <InputPasswordToogle
                  control={control}
                  value={password}
                  disabled={true}
                  onChange={handlePassChange}
                ></InputPasswordToogle>
              </Field>
            </div>
            <div className="user-layout">
              <Field>
                <Label>{t("description")}</Label>
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
                {/* <Textarea
                  name="description"
                  control={control}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Textarea> */}
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
        </div>
      </Layout>
    </UserUpdateStyles>
  );
};

export default UserEdit;
