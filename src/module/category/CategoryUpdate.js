import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Button, Field, Input, Label, Radio } from "../../components";
import { useForm } from "react-hook-form";
import { categoryValue, roleStatus } from "../../utils/constants";
import styled from "styled-components";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

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
const schema = yup.object({
  name: yup.string().required("Please enter name"),
  slug: yup.string().required("Please enter slug"),
});
const CategoryUpdate = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const [prevSlug, setPrevSlug] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      const colRef = doc(db, "category", categoryId);
      const singleDoc = await getDoc(colRef);
      //Reset dữ liệu các ô input về dữ liệu vừa mới lấy (singleDoc)
      reset(singleDoc.data());
      setPrevSlug(singleDoc.data()?.slug);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, reset]);
  const handleUpdateCategory = async (values) => {
    const colRef = doc(db, "category", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    });
    setNewSlug(slugify(values.slug, { lower: true }));
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
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">{t("slug")}</Label>
            <Input
              control={control}
              name="slug"
              placeholder={t("slugPlace")}
            ></Input>
          </Field>
        </div>
        <div className="category-layout">
          <Field>
            <Label>{t("status")}</Label>
            <div className="radio-category">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryValue.Approved}
                value={categoryValue.Approved}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryValue.UnApproved}
                value={categoryValue.UnApproved}
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
