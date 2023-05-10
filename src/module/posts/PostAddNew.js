import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  Button,
  DropDown,
  Field,
  ImageUpload,
  Input,
  Label,
  Radio,
  Toggle,
} from "../../components";
import slugify from "slugify";
import { postValue, roleStatus } from "../../utils/constants";
import usehandleImage from "../../hooks/useHandleImage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import DashboardHeading from "../dashboard/DashboardHeading";
Quill.register("modules/imageUploader", ImageUploader);

const PostAddNewStyles = styled.div`
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
const PostAddNew = () => {
  const { userInfo } = useAuth();
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
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      hot: false,
      image: "",
      category: {},
      createdAt: serverTimestamp(),
    },
  });
  const {
    handleDeleteImage,
    handleSelectImage,
    progress,
    image,
    setImage,
    setProgress,
  } = usehandleImage(setValue, getValues);
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    if (!userInfo?.uid) return;
    async function fetchUserData() {
      const colRef = doc(db, "users", userInfo?.uid);
      const docData = await getDoc(colRef);
      setValue("user", {
        id: docData.id,
        ...docData.data(),
      });
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.uid]);
  const addPost = async (values) => {
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(cloneValues.status);
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        content,
        // userId: userInfo.uid,
      });
      toast.success("Add new posts successfully!");
      reset({
        title: "",
        slug: "",
        status: 2,
        hot: false,
        image: "",
        category: {},
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
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "category");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategory(result);
    }
    getData();
  }, []);
  const handleOnClick = async (item) => {
    const colRef = doc(db, "category", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
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
    document.title = "Post Add Page";
  });
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <PostAddNewStyles>
      <DashboardHeading title="New Post" desc="Add New Post"></DashboardHeading>
      <form onSubmit={handleSubmit(addPost)}>
        <div className="add-post">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="add-post">
          <Field>
            <Label>Status</Label>
            <div className="status">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postValue.Approved}
                onClick={() => setValue("status", "approved")}
                value={postValue.Approved}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postValue.Pending}
                onClick={() => setValue("status", "pending")}
                value={postValue.Pending}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postValue.Reject}
                onClick={() => setValue("status", "reject")}
                value={postValue.Reject}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Category</Label>
            <DropDown>
              <DropDown.Select
                placeholder={`${
                  selectCategory?.name || "Please select an option"
                }`}
              ></DropDown.Select>
              <DropDown.List>
                {category?.map((item) => (
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
            <Label>Upload Image</Label>
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
          <Field>
            <Label>Feature</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
        </div>
        <div className="content entry-content">
          <Label>Content</Label>
          <div>
            <ReactQuill
              modules={modules}
              theme="snow"
              value={content}
              onChange={setContent}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="button-add"
          isLoading={loading}
          disabled={loading}
        >
          Add New Post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
