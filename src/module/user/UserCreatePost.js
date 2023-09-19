import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import {
  Button,
  DropDown,
  Field,
  ImageUpload,
  Input,
  Label,
  Layout,
  Radio,
  Toggle,
} from "../../components";
import slugify from "slugify";
import { baseUrl } from "../../utils/constants";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useTranslation } from "react-i18next";
import useHandleImage from "../../hooks/useHandleImage";
import useGetCategory from "../../hooks/useGetCategory";
Quill.register("modules/imageUploader", ImageUploader);

const PostAddNewStyles = styled.div`
  padding: 20px 0;
  .add-post {
    display: grid;
    grid-template-columns: repeat(2, 45%);
    column-gap: 40px;
    margin-bottom: 40px;
  }
  .status {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  .button-add {
    margin: 0 auto;
    max-width: 250px;
  }
  .content {
    width: 100%;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  .title-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    ${(props) =>
      props.showContentEn === true &&
      css`
        display: none;
      `}
  }
  .content-en {
    display: none;
    ${(props) =>
      props.showContentEn === true &&
      css`
        display: block;
      `}
  }
  @media screen and (max-width: 600px) {
    .add-post {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
`;
const schema = yup.object({
  title: yup
    .string()
    .required("Please enter title")
    .min(50, "Title must be least 50 characters"),
});
const UserCreatePost = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      titleEN: "",
      slug: "",
      status: 2,
      hot: false,
      image: "",
      content: "",
      contentEN: "",
      user: {},
      category: {},
      view: 0,
      like: 0,
      // createdAt: serverTimestamp(),
    },
  });
  const {
    handleDeleteImage,
    handleSelectImage,
    progress,
    image,
    setImage,
    setProgress,
  } = useHandleImage(setValue, getValues);
  const watchHot = watch("hot");
  const [selectCategory, setSelectCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [contentEN, setContentEN] = useState("");
  const [showContentEn, setShowContentEN] = useState(false);

  useEffect(() => {
    if (!userInfo?._id) return;
    setValue("user", {
      id: userInfo?._id,
      userName: userInfo?.userName,
      slug: userInfo?.slug,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?._id]);
  const addPost = async (values) => {
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(cloneValues.status);
      cloneValues.image = image;
      cloneValues.content = content;
      cloneValues.contentEN = contentEN;
      axios
        .post(baseUrl.cretePost, cloneValues)
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      toast.success(`${t("toastCreatePost")}`);
      reset({
        title: "",
        slug: "",
        status: 2,
        hot: false,
        image: "",
        category: {},
        user: {},
        content: "",
      });
      setImage("");
      setSelectCategory("");
      setContent("");
      setProgress(0);
      document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (erorr) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const { category: categoryPost } = useGetCategory();
  // useEffect(() => {
  //   async function fetchData() {
  //     await axios
  //       .get(baseUrl.getCategory)
  //       .then((result) => setCategoryPost(result.data))
  //       .catch((err) => console.log(err));
  //   }
  //   fetchData();
  // }, []);
  const handleOnClick = async (item) => {
    setValue("category", {
      id: item._id,
      name: item.name,
      slug: item.slug,
    });
    setSelectCategory(item);
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          console.log("upload: ~ file", file);
          const bodyFormData = new FormData();
          console.log("upload: ~ bodyFormData", bodyFormData);
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=2b50a1f27ed98d03cc9f0e726b8fc2ab",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  const modulesEN = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          console.log("upload: ~ file", file);
          const bodyFormData = new FormData();
          console.log("upload: ~ bodyFormData", bodyFormData);
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=2b50a1f27ed98d03cc9f0e726b8fc2ab",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );

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
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  useEffect(() => {
    document.title = "Post Add Page";
  });
  return (
    <Layout>
      <PostAddNewStyles showContentEn={showContentEn}>
        <div className="container">
          <DashboardHeading
            title={t("newPost")}
            desc={t("addNewPost")}
          ></DashboardHeading>
          <form onSubmit={handleSubmit(addPost)}>
            <div className="add-post">
              <Field>
                <Label htmlFor="title">{t("title")}</Label>
                <Input
                  control={control}
                  placeholder={t("titlePlace")}
                  name="title"
                ></Input>
              </Field>
              <Field>
                <Label htmlFor="title">{t("title")} EN</Label>
                <Input
                  control={control}
                  placeholder={`${t("titlePlace")} EN`}
                  name="titleEN"
                ></Input>
              </Field>
            </div>
            <div className="add-post">
              {/* <Field>
                <Label>{t("status")}</Label>
                <div className="status">
                  <Radio name="status" control={control} checked={true}>
                    Pending
                  </Radio>
                </div>
              </Field> */}
              <Field>
                <Label htmlFor="slug">{t("slug")}</Label>
                <Input
                  control={control}
                  placeholder={t("slugPlace")}
                  name="slug"
                ></Input>
              </Field>
              <Field>
                <Label>{t("category")}</Label>
                <DropDown>
                  <DropDown.Select
                    placeholder={`${
                      selectCategory?.name || "Please select an option"
                    }`}
                  ></DropDown.Select>
                  <DropDown.List>
                    {categoryPost?.map((item) => (
                      <DropDown.Options
                        key={item.id}
                        onClick={() => handleOnClick(item)}
                      >
                        {item.name}
                      </DropDown.Options>
                    ))}
                  </DropDown.List>
                </DropDown>
              </Field>
            </div>
            <div className="add-post">
              <Field>
                <Label>{t("uploadImage")}</Label>
                <ImageUpload
                  name="image"
                  post={true}
                  className="image-select"
                  image={image}
                  handleDeleteImage={handleDeleteImage}
                  progress={progress}
                  onChange={handleSelectImage}
                ></ImageUpload>
              </Field>
              {/* <Field>
                <Label>{t("feature")}</Label>
                <Toggle
                  on={watchHot === true}
                  onClick={() => setValue("hot", !watchHot)}
                ></Toggle>
              </Field> */}
            </div>
            <div className="content entry-content">
              <div className="title-content">
                <Label>{t("content")}</Label>
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
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                />
              </div>
              <div className="content-en">
                <ReactQuill
                  modules={modulesEN}
                  theme="snow"
                  value={contentEN}
                  onChange={setContentEN}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="button-add"
              isLoading={loading}
              disabled={loading}
            >
              {t("addNewPost")}
            </Button>
          </form>
        </div>
      </PostAddNewStyles>
    </Layout>
  );
};

export default UserCreatePost;
