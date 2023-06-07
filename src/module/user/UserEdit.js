import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  Button,
  Field,
  ImageUpload,
  Input,
  InputPasswordToogle,
  Label,
  Layout,
  Radio,
  Textarea,
} from "../../components";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../../firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import useHandleImage from "../../hooks/useHandleImage";
import { useTranslation } from "react-i18next";

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
  @media screen and (max-width: 600px) {
    .user-layout {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
`;

const UserEdit = () => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const userId = params.get("id");
  const navigate = useNavigate();
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { handleDeleteImage, handleSelectImage, progress, image, setImage } =
    useHandleImage(setValue, getValues, imageName, deleteAvatar);
  const handleUpdateUser = async (values) => {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      ...values,
      avatar: image,
    });
    toast.success(`${t("toastUpdateUser")}`);
    navigate("/userInfo");
  };
  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "users", userId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [userId, reset]);
  useEffect(() => {
    document.title = "User Edit Page";
  });
  if (!userId) return null;
  return (
    <UserUpdateStyles>
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
                image={image}
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
                ></Input>
              </Field>
              <Field>
                <Label>{t("fullName")}</Label>
                <Input
                  control={control}
                  name="fullName"
                  placeholder={t("fullNamePlace")}
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
                ></Input>
              </Field>
              <Field>
                <Label>{t("pass")}</Label>
                <InputPasswordToogle control={control}></InputPasswordToogle>
              </Field>
            </div>
            <div className="user-layout">
              <Field>
                <Label>{t("description")}</Label>
                <Textarea name="description" control={control}></Textarea>
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
