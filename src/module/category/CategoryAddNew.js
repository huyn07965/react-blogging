import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import styled from "styled-components";
import { Button, Field, Input, Label, Radio } from "../../components";
import { baseUrl, categoryValue, roleStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useAuth } from "../../contexts/auth-context";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { values } from "lodash";
import axios from "axios";

const CategoryAddNewStyles = styled.div`
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
});
const CategoryAddNew = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      nameEN: "",
      slug: "",
      status: 1,
      // createdAt: new Date(),
    },
  });
  const watchStatus = watch("status");

  const addCategory = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    newValues.slug = slugify(values.slug || values.name, { lower: true });
    newValues.status = Number(newValues.status);
    try {
      axios
        // .post("https://node-app-blogging.onrender.com/createCategory", newValues)
        .post(baseUrl.creteCategory, newValues)
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      // await addDoc(colRef, {
      //   ...newValues,
      //   createdAt: serverTimestamp(),
      // });
      toast.success(`${t("toastCreateCategory")}`);
    } catch (erorr) {
      toast.success(`${t("toastCreateCategory")}`);
    } finally {
      reset({
        name: "",
        nameEN: "",
        slug: "",
        status: 1,
      });
    }
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
  useEffect(() => {
    document.title = "Category Add Page";
  });

  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <CategoryAddNewStyles>
      <DashboardHeading
        title={t("newCategory")}
        desc={t("addNewCategory")}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(addCategory)}>
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
            <Label htmlFor="name">{t("name")} EN</Label>
            <Input
              control={control}
              name="nameEN"
              placeholder={`${t("categoryPlace")} EN`}
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
            ></Input>
          </Field>
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
          {t("addNewCategory")}
        </Button>
      </form>
    </CategoryAddNewStyles>
  );
};

export default CategoryAddNew;
