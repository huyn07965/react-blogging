import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Button, Field, Input, Label, Radio } from "../../components";
import { useForm } from "react-hook-form";
import { categoryValue, roleStatus, baseUrl } from "../../utils/constants";
import styled from "styled-components";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import axios from "axios";

const CategoryUpdateStyles = styled.div`
  .category-layout {
    display: grid;
    grid-template-columns: repeat(2, 45%);
    column-gap: 40px;
    margin-bottom: 40px;
  }
  .radio-category {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .button-category {
    margin: 0 auto;
    max-width: 250px;
  }
  @media screen and (max-width: 600px) {
    .category-layout {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
`;
// const schema = yup.object({
//   name: yup.string().required("Please enter name"),
//   slug: yup.string().required("Please enter slug"),
// });
const CategoryUpdate = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const [name, setName] = useState();
  const [nameEN, setNameEN] = useState();
  const [slug, setSlug] = useState();
  const [status, setStatus] = useState();
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      axios
        .get(baseUrl.getCategoryById + categoryId)
        .then((result) => {
          setName(result.data.name);
          setNameEN(result.data.nameEN);
          setSlug(result.data.slug);
          setStatus(result.data.status);
        })
        .catch((err) => console.log(err));
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, reset]);
  const handleUpdateCategory = async (values) => {
    axios
      .put(baseUrl.updateCategory + categoryId, {
        name,
        nameEN,
        slug: slugify(slug || name, { lower: true }),
        status: Number(status),
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    toast.success(`${t("toastUpdateCategory")}`);
    navigate("/manage/category");
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
  const watchStatus = watch("status");

  // useEffect(() => {
  //   if (prevSlug !== newSlug) {
  //     async function fetchData() {
  //       const colRef = collection(db, "posts");
  //       const docPost = query(colRef, where("category.slug", "==", prevSlug));
  //       onSnapshot(docPost, (snapshot) => {
  //         let result = [];
  //         snapshot.forEach((doc) => {
  //           result.push({
  //             id: doc.id,
  //             ...doc.data(),
  //           });
  //         });
  //         result.map((item) => {
  //           const colRef = doc(db, "posts", item.id);
  //           updateDoc(colRef, {
  //             category: {
  //               id: item?.category?.id,
  //               slug: newSlug,
  //             },
  //           });
  //         });
  //       });
  //     }
  //     fetchData();

  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [newSlug.length > 0]);
  useEffect(() => {
    document.title = "Category Update Page";
  });
  if (!categoryId) return null;
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <CategoryUpdateStyles>
      <DashboardHeading
        title={t("updateCategory")}
        desc={`${t("updateCategoryId")} ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="category-layout">
          <Field>
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              control={control}
              name="name"
              placeholder={t("categoryPlace")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="name">{t("name")} EN</Label>
            <Input
              control={control}
              name="name"
              placeholder={`${t("categoryPlace")} EN`}
              value={nameEN}
              onChange={(e) => setNameEN(e.target.value)}
            ></Input>
          </Field>
        </div>
        <div className="category-layout">
          <Field>
            <Label htmlFor="slug">{t("slug")}</Label>
            <Input
              control={control}
              name="slug"
              placeholder={t("slugPlace")}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            ></Input>
          </Field>
          <Field>
            <Label>{t("status")}</Label>
            <div className="radio-category">
              <Radio
                name="status"
                control={control}
                checked={Number(status) === categoryValue.Approved}
                value={categoryValue.Approved}
                onChange={(e) => setStatus(e.target.value)}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(status) === categoryValue.UnApproved}
                value={categoryValue.UnApproved}
                onChange={(e) => setStatus(e.target.value)}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="button-category"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {t("updateCategory")}
        </Button>
      </form>
    </CategoryUpdateStyles>
  );
};

export default CategoryUpdate;
