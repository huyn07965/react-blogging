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
  Radio,
  Textarea,
} from "../../components";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../../firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { roleStatus, userStatus } from "../../utils/constants";
import useHandleImage from "../../hooks/useHandleImage";
import { useAuth } from "../../contexts/auth-context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  @media screen and (max-width: 600px) {
    .user-layout {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
`;
const schema = yup.object({
  fullName: yup.string().required("Please enter full name"),
  userName: yup
    .string()
    .required("Please enter user name")
    .max(9, "Username must be less than 10 characters"),
  password: yup
    .string()
    .required("Please enter password")
    .min(8, "Password must be least 8 characters"),
  slug: yup.string().required("Please enter slug"),
});
const UserUpdate = () => {
  const { userInfo } = useAuth();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [params] = useSearchParams();
  const userId = params.get("id");
  const navigate = useNavigate();
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { handleDeleteImage, handleSelectImage, progress, image, setImage } =
    useHandleImage(setValue, getValues, imageName, deleteAvatar);
  const handleUpdateUser = async (values) => {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      ...values,
      role: Number(values.role),
      status: Number(values.status),
      avatar: image,
    });
    toast.success("Update user successfully!");
    navigate("/manage/user");
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
    <UserUpdateStyles>
      <DashboardHeading title="User" desc="Update user"></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="user-avatar">
          <ImageUpload
            className="image-avatar"
            name="image"
            avatar={true}
            image={image}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            onChange={handleSelectImage}
          ></ImageUpload>
        </div>
        <div className="user-layout">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              placeholder="Enter your email"
              disabled={true}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              control={control}
              name="fullName"
              placeholder="Enter your full name"
            ></Input>
          </Field>
        </div>
        <div className="user-layout">
          <Field>
            <Label htmlFor="userName">User Name</Label>
            <Input
              name="userName"
              control={control}
              placeholder="Enter your user name"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <InputPasswordToogle control={control}></InputPasswordToogle>
          </Field>
        </div>
        <div className="user-layout">
          <Field>
            <Label>Status</Label>
            <div className="radio-user">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.Active}
                value={userStatus.Active}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.Pending}
                value={userStatus.Pending}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.Reject}
                value={userStatus.Reject}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Role</Label>
            <div className="radio-user">
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === roleStatus.Admin}
                value={roleStatus.Admin}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === roleStatus.Mod}
                value={roleStatus.Mod}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === roleStatus.User}
                value={roleStatus.User}
              >
                User
              </Radio>
            </div>
          </Field>
        </div>
        <div className="user-layout">
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              name="slug"
              control={control}
              placeholder="Enter your new slug"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="description">Description</Label>
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
          Update User
        </Button>
      </form>
    </UserUpdateStyles>
  );
};

export default UserUpdate;
