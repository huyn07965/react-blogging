import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Button, Input, Layout, Radio, Textarea, Label } from "../components";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";

const SignUpAuthorStyles = styled.div`
  padding-top: 20px;
  .content {
    width: 72%;
    margin: 0 auto;
  }
  .button-approve {
    width: 25%;
    margin: 20px auto;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
  }
  .check-text {
    color: ${(props) => props.theme.primary};
    font-weight: 600;
    font-size: 18px;
  }
  @media screen and (max-width: 1024px) {
    .content {
      width: 100%;
      margin: 0 auto;
    }
  }
  @media screen and (max-width: 600px) {
    .button-approve {
      width: 30%;
      height: 40px;
      margin-top: 40px;
    }
  }
`;
const PopupStyles = styled.div`
  width: 45%;
  position: fixed;
  top: ${(props) => (props.showPopup ? "50%" : "-1000%")};
  left: 50%;
  transform: translate(-50%, ${(props) => (props.showPopup ? "-50%" : "0")});
  background-color: white;
  padding: 30px 40px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: top 0.5s, transform 0.5s;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  border-radius: 8px;
  h2 {
    text-align: center;
    color: ${(props) => props.theme.primary};
  }
  .form {
    width: 100%;
  }
  .description {
    width: 100%;
    margin-bottom: 20px;
  }
  .title-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
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
    width: 100%;
    ${(props) =>
      props.showContentEn === true &&
      css`
        display: none;
      `}
  }
  .content-en {
    display: none;
    width: 100%;
    ${(props) =>
      props.showContentEn === true &&
      css`
        display: block;
      `}
  }
`;
const SignUpAuthor = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues: {},
  });
  const { userInfo } = useAuth();
  const [content, setContent] = useState();
  const [approve, setApprove] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [descriptionEN, setDescriptionEN] = useState("");
  const [showContentEn, setShowContentEN] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      await axios
        .get(baseUrl.getRule + "64f6d309dac75a3ef5687596")
        .then((result) => setContent(result.data.content))
        .catch((err) => console.log(err));
    }
    getData();
  }, []);
  const handleApprove = () => {
    if (!approve) {
      toast.error(`${t("signUpAuthorErr")}`);
    } else {
      setShowPopup(true);
    }
  };
  const handleUpdateDesc = async (values) => {
    await axios
      .put(baseUrl.updateUser + userInfo?._id, {
        role: 2,
        description: values.description,
        descriptionEN: values.descriptionEN,
      })
      .then(() => {
        toast.success(`${t("signUpAuthorSuccess")}`);
        setShowPopup(false);
        navigate("/create-post");
      })
      .catch((err) => console.log(err));
  };
  if (!userInfo) {
    navigate("/sign-in");
  }
  if (userInfo?.role === 2) {
    navigate("/create-post");
  }
  useEffect(() => {
    document.title = "Sign Up Create Post";
  });
  return (
    <SignUpAuthorStyles>
      <Layout>
        <div className="container">
          <div className="content">
            <div
              className="entry-content"
              dangerouslySetInnerHTML={{
                __html: content || "",
              }}
            ></div>
            <Radio
              name="status"
              control={control}
              checked={approve}
              onClick={() => setApprove(!approve)}
            >
              <p className="check-text">{t("approveRule")}</p>
            </Radio>
            <Button className="button-approve" onClick={handleApprove}>
              {t("signUp")}
            </Button>
          </div>
        </div>
        {showPopup && (
          <div onClick={() => setShowPopup(false)} className="overlay"></div>
        )}
        <PopupStyles showPopup={showPopup} showContentEn={showContentEn}>
          <h2>
            {t("writeDesc")}
            <br></br> {t("writeDescLike")}
          </h2>
          <form className="form" onSubmit={handleSubmit(handleUpdateDesc)}>
            <div className="title-content">
              <Label htmlFor="description">{t("description")}</Label>
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
              <Textarea
                name="description"
                // value={description}
                control={control}
                // onChange={(e) => setDescription(e.target.value)}
              ></Textarea>
            </div>
            <div className="content-en">
              <Textarea
                name="descriptionEN"
                // value={descriptionEN}
                control={control}
                // onChange={(e) => setDescriptionEN(e.target.value)}
              ></Textarea>
            </div>
            {/* <Textarea
              control={control}
              type="description"
              name="description"
              className="description"
            ></Textarea> */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              style={{ maxWidth: "40%", margin: "0 auto" }}
            >
              {t("send")}
            </Button>
          </form>
        </PopupStyles>
      </Layout>
    </SignUpAuthorStyles>
  );
};

export default SignUpAuthor;
