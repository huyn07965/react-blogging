import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Button, Field, Input, Label, Radio } from "../../components";
import { useForm } from "react-hook-form";
import { categoryValue, roleStatus } from "../../utils/constants";
import styled from "styled-components";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
    }
    getData();
  }, [categoryId, reset]);

  const handleUpdateCategory = async (values) => {
    const colRef = doc(db, "category", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    });
    toast.success("Update category successfully!");
    navigate("/manage/category");
  };
  const watchStatus = watch("status");
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
    document.title = "Category Update Page";
  });
  if (!categoryId) return null;
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <CategoryUpdateStyles>
      <DashboardHeading
        title="Update Category"
        desc={`Update Category your Id: ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="category-layout">
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="category-layout">
          <Field>
            <Label>Status</Label>
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
          Update category
        </Button>
      </form>
    </CategoryUpdateStyles>
  );
};

export default CategoryUpdate;
