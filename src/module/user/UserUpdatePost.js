import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { useAuth } from "../../contexts/auth-context";
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
import { baseUrl, postValue } from "../../utils/constants";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useHandleImage from "../../hooks/useHandleImage";
import { useState } from "react";
import { toast } from "react-toastify";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import slugify from "slugify";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useTranslation } from "react-i18next";
import useGetCategory from "../../hooks/useGetCategory";
Quill.register("modules/imageUploader", ImageUploader);
const PostUpdateStyles = styled.div`
  .update-post {
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
  .button-update {
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
    .update-post {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
`;
// const schema = yup.object({
//   title: yup
//     .string()
//     .required("Please enter title")
//     .min(50, "Title must be least 50 characters"),
//   slug: yup.string().required("Please enter slug"),
// });
const UserUpdatePost = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const postId = params.get("id");
  const navigate = useNavigate();
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const imageUrl = getValues("image");
  const [title, setTitle] = useState("");
  const [titleEN, setTitleEN] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("");
  const [hot, setHot] = useState("");
  const [images, setImages] = useState("");
  const [content, setContent] = useState("");
  const [contentEN, setContentEN] = useState("");
  const [showContentEn, setShowContentEN] = useState(false);

  useEffect(() => {
    async function getData() {
      axios
        .get(baseUrl.getPostById + postId)
        .then((result) => {
          setTitle(result.data.title);
          setTitleEN(result?.data.titleEN);
          setSlug(result.data.slug);
          setStatus(result.data.status);
          setHot(result.data.hot);
          setImages(result.data.image);
          setSelectCategory(result.data.category);
          setContent(result.data.content);
          setContentEN(result?.data.contentEN);
          // setCategoryId(result.data.category?.id);
        })
        .catch((err) => console.log(err));
    }
    getData();
  }, [postId, reset]);

  useEffect(() => {
    async function getCategory() {
      axios
        .get(baseUrl.getCategoryById + categoryId)
        .then((result) => {
          setSelectCategory(result.data);
        })
        .catch((err) => console.log(err));
    }
    getCategory();
  }, [categoryId]);

  const { handleDeleteImage, handleSelectImage, progress, image, setImage } =
    useHandleImage(setValue, getValues);

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  useEffect(() => {
    setImages(image);
  }, [image]);

  const { category: categoryList } = useGetCategory();
  // useEffect(() => {
  //   async function getData() {
  //     await axios
  //       .get(baseUrl.getCategory)
  //       .then((result) => setCategoryList(result.data))
  //       .catch((err) => console.log(err));
  //   }
  //   getData();
  // }, []);

  const handleOnClick = async (item) => {
    setCategory({
      id: item._id,
      name: item.name,
      slug: item.slug,
    });
    setSelectCategory(item);
  };
  const handleUpdatePost = async (values) => {
    axios
      .put(baseUrl.updatePost + postId, {
        title,
        titleEN,
        slug: slugify(slug || title, { lower: true }),
        status,
        hot,
        image,
        content,
        contentEN,
        category: category || selectCategory,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    toast.success(`${t("toastUpdatePost")}`);
    navigate("/user-post");
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button valconsole.logues
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
        [{ header: 1 }, { header: 2 }], // custom button valconsole.logues
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
    document.title = "Post Update Page";
  });
  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return <p>Active</p>;
      case 2:
        return <p p>Pending</p>;
      case 3:
        return <p>Reject</p>;
      default:
        break;
    }
  };
  if (!postId) return null;
  return (
    <Layout>
      <PostUpdateStyles showContentEn={showContentEn}>
        <div className="container">
          <DashboardHeading
            title={t("updatePost")}
            desc={`${t("updatePostId")} ${postId}`}
          ></DashboardHeading>
          <form onSubmit={handleSubmit(handleUpdatePost)}>
            <div className="update-post">
              <Field>
                <Label htmlFor="title">{t("title")}</Label>
                <Input
                  control={control}
                  placeholder={t("titlePlace")}
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Input>
              </Field>
              <Field>
                <Label htmlFor="title">{t("title")} EN</Label>
                <Input
                  control={control}
                  placeholder={`${t("titlePlace")} EN`}
                  name="titleEN"
                  value={titleEN}
                  onChange={(e) => setTitleEN(e.target.value)}
                ></Input>
              </Field>
            </div>
            <div className="update-post">
              {/* <Field>
                <Label>{t("status")}</Label>
                <div className="status">
                  <Radio
                    name="status"
                    control={control}
                    checked={Number(status) === postValue.Active}
                    // onClick={() => setValue("status", "active")}
                    onChange={(e) => setStatus(e.target.value)}
                    value={postValue.Active}
                  >
                    {renderStatus(Number(status))}
                  </Radio>
                </div>
              </Field> */}
              <Field>
                <Label htmlFor="slug">{t("slug")}</Label>
                <Input
                  control={control}
                  placeholder={t("slugPlace")}
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
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
                    {categoryList?.map((item) => (
                      <DropDown.Options
                        key={item._id}
                        onClick={() => handleOnClick(item)}
                      >
                        {item.name}
                      </DropDown.Options>
                    ))}
                  </DropDown.List>
                </DropDown>
              </Field>
            </div>
            <div className="update-post">
              <Field>
                <Label>{t("uploadImage")}</Label>
                <ImageUpload
                  name="image"
                  post={true}
                  className="image-select"
                  image={images}
                  handleDeleteImage={handleDeleteImage}
                  progress={progress}
                  onChange={handleSelectImage}
                ></ImageUpload>
              </Field>
              {/* <Field>
                <Label>{t("feature")}</Label>
                <Toggle on={hot === true} onClick={() => setHot(!hot)}></Toggle>
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
              className="button-update"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {t("updatePost")}
            </Button>
          </form>
        </div>
      </PostUpdateStyles>
    </Layout>
  );
};

export default UserUpdatePost;
