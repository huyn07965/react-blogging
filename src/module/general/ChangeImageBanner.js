import React, { useEffect, useState } from "react";
import { Button, Field, ImageUpload, Input, Label } from "../../components";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useHandleImage from "../../hooks/useHandleImage";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangeImageBannerStyles = styled.div`
  padding: 20px 10px;
  .add-post {
    display: grid;
    grid-template-columns: repeat(2, 45%);
    column-gap: 40px;
    margin-bottom: 40px;
  }
  .image-select {
    margin: 20px 0;
  }
  .change-image {
    margin: 0 auto;
    max-width: 250px;
  }
`;
const ChangeImageBanner = () => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [titleEN, setTitleEN] = useState("");

  const {
    handleDeleteImage,
    handleSelectImage,
    progress,
    image,
    setImage,
    setProgress,
  } = useHandleImage(setValue, getValues);

  const idBanner = "65006457d3e9342858cc9dba";

  const imageUrl = getValues("image");
  const [images, setImages] = useState("");
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl.getBanner + idBanner)
        .then((result) => {
          setTitle(result.data.title);
          setTitleEN(result.data.titleEN);
          setImages(result.data.image);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  useEffect(() => {
    setImages(image);
  }, [image]);

  const handleChangeImage = async (values) => {
    await axios
      .put(baseUrl.updateBanner + idBanner, { title, titleEN, image })
      .then((result) => {
        console.log(result);
        toast.success(`${t("changeBanner")}`);
        navigate("/manage/general");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    document.title = "Update Banner";
  });
  return (
    <ChangeImageBannerStyles>
      <form onSubmit={handleSubmit(handleChangeImage)}>
        <div className="add-post">
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
        <div className="add-post">
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
        </div>

        <Button
          type="submit"
          className="change-image"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {t("updateAbout")}
        </Button>
      </form>
    </ChangeImageBannerStyles>
  );
};

export default ChangeImageBanner;
