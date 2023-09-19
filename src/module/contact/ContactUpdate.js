import React from "react";
import styled, { css } from "styled-components";
import { Button, Label } from "../../components";
import { useState } from "react";
import axios from "axios";
import { useMemo } from "react";
import { toast } from "react-toastify";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";
import { baseUrl, roleStatus } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
Quill.register("modules/imageUploader", ImageUploader);

const ContactUpdateStyles = styled.div`
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
`;
const ContactUpdate = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [content, setContent] = useState();
  const [contentEN, setContentEN] = useState();
  const [showContentEn, setShowContentEN] = useState(false);
  useEffect(() => {
    async function getData() {
      await axios
        .get(baseUrl.getContact + "64e193ea5ca8feebbb89fa8c")
        .then((result) => {
          setContent(result.data.content);
          setContentEN(result.data.contentEN);
        })
        .catch((err) => console.log(err));
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateContact = async (values) => {
    await axios
      .put(baseUrl.updateContact + "64e193ea5ca8feebbb89fa8c", {
        content,
        contentEN,
      })
      .then((result) => {
        console.log(result);
        toast.success(`${t("toastUpdateAbout")}`);
        navigate("/manage/general");
      })
      .catch((err) => console.log(err));
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
    document.title = "Contact Update Page";
  });
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <ContactUpdateStyles showContentEn={showContentEn}>
      <form onSubmit={handleSubmit(handleUpdateContact)}>
        <div className="content entry-content">
          <Label>{t("about")}</Label>
          <div className="show-content">
            <div className="vn" onClick={() => setShowContentEN(false)}>
              VN
            </div>
            <div className="en" onClick={() => setShowContentEN(true)}>
              EN
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
          {t("updateAbout")}
        </Button>
      </form>
    </ContactUpdateStyles>
  );
};

export default ContactUpdate;
