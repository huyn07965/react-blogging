import React from "react";
import styled from "styled-components";
import { Button, Label } from "../../components";
import { useState } from "react";
import axios from "axios";
import { useMemo } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { toast } from "react-toastify";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";
import { roleStatus } from "../../utils/constants";
import { useTranslation } from "react-i18next";
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
`;
const ContactUpdate = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const [content, setContent] = useState("");
  useEffect(() => {
    async function getData() {
      const colRef = doc(db, "contact", "Kh1cMxZMVEUXNGV3Msaf");
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
      setContent(singleDoc.data()?.content || "");
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleUpdateContact = async (values) => {
    const colRef = doc(db, "contact", "Kh1cMxZMVEUXNGV3Msaf");
    await updateDoc(colRef, {
      content,
    });
    toast.success(`${t("toastUpdateAbout")}`);
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
    document.title = "Contact Update Page";
  });
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <ContactUpdateStyles>
      <form onSubmit={handleSubmit(handleUpdateContact)}>
        <div className="content entry-content">
          <Label>{t("about")}</Label>
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
