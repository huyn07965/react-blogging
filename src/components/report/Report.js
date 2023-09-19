import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Radio from "../checkbox/Radio";
import { useForm } from "react-hook-form";
import Button from "../button/Button";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import Textarea from "../textarea/Textarea";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import useGetPostById from "../../hooks/useGetPostById";

const ReportStyles = styled.div`
  width: 100%;
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 40;
  }
  .report {
    width: 40%;
    position: fixed;
    top: ${(props) => (props.showReport ? "50%" : "-1000%")};
    left: 50%;
    transform: translate(-50%, ${(props) => (props.showReport ? "-50%" : "0")});
    background-color: white;
    padding: 40px 40px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 50;
    transition: top 0.5s, transform 0.5s;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    border-radius: 8px;
    h1 {
      margin: 0 auto;
      color: ${(props) => props.theme.primary};
    }
  }
  .form-submit {
    width: 100%;
  }
  .option-reason {
    padding-bottom: 20px;
  }

  .button-report {
    width: 40%;
    margin: 0 auto;
  }
  .title-desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 18px;
      font-weight: 600;
      color: ${(props) => props.theme.primary};
    }
    padding: 20px 0;
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
    margin-bottom: 15px;
    ${(props) =>
      props.showContentEn === true &&
      css`
        display: none;
      `}
  }
  .content-en {
    display: none;
    margin-bottom: 15px;
    ${(props) =>
      props.showContentEn === true &&
      css`
        display: block;
      `}
  }
`;

const Report = ({ showReport, setShowReport, idUser, idPost, idComment }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues: {
      report: "",
    },
  });
  const [reason, setReason] = useState({
    idPost: "",
    idComment: "",
    idUser: "",
    reason: [],
    reasonEN: [],
    description: "",
    descriptionEN: "",
    active: false,
  });
  const [reasonOne, setReasonOne] = useState("");
  const [reasonTwo, setReasonTwo] = useState("");
  const [reasonThree, setReasonThree] = useState("");
  const [reasonOneEN, setReasonOneEN] = useState("");
  const [reasonTwoEN, setReasonTwoEN] = useState("");
  const [reasonThreeEN, setReasonThreeEN] = useState("");
  const [showContentEn, setShowContentEN] = useState(false);
  const { t } = useTranslation();
  const itemLng = localStorage.getItem("lng");
  const DataReport = {
    reasonOne: "Vi phạm nguyên tắc cộng đồng",
    reasonTwo: "Sao chép từ nguồn khác",
    reasonThree: "Ngôn từ mang tính chất xúc phạm",
    reasonOneEN: "Violation of community guidelines",
    reasonTwoEN: "Copying from another source",
    reasonThreeEN: "Offensive language",
  };

  const handleSetReasonOne = () => {
    if (reasonOne.length === 0) {
      setReasonOne(DataReport.reasonOne);
      setReasonOneEN(DataReport.reasonOneEN);
    } else {
      setReasonOne("");
      setReasonOneEN("");
    }
  };
  const handleSetReasonTwo = () => {
    if (reasonTwo.length === 0) {
      setReasonTwo(DataReport.reasonTwo);
      setReasonTwoEN(DataReport.reasonTwoEN);
    } else {
      setReasonTwo("");
      setReasonTwoEN("");
    }
  };
  const handleSetReasonThree = () => {
    if (reasonThree.length === 0) {
      setReasonThree(DataReport.reasonThree);
      setReasonThreeEN(DataReport.reasonThreeEN);
    } else {
      setReasonThree("");
      setReasonThreeEN("");
    }
  };
  const handleReport = (values) => {
    const checkArray = [reasonOne, reasonTwo, reasonThree].filter(
      (reason) => reason !== ""
    );
    const checkArrayEN = [reasonOneEN, reasonTwoEN, reasonThreeEN].filter(
      (reason) => reason !== ""
    );
    reason.idUser = idUser;
    reason.idPost = idPost;
    reason.reason = checkArray;
    reason.reasonEN = checkArrayEN;
    reason.description = values.report;
    reason.descriptionEN = values.reportEn;
    reason.idComment = idComment ? idComment : "";
    async function createReport() {
      await axios
        .post(baseUrl.createReport, reason)
        .then((result) => {
          toast.success(`${t("reportSuccess")}`);
          setShowReport(false);
          setReasonOne("");
          setReasonTwo("");
          setReasonThree("");
          setReasonOneEN("");
          setReasonTwoEN("");
          setReasonThreeEN("");
          reset({
            comment: "",
          });
          axios.post(baseUrl.createNotification, {
            UserReceive: idUser,
            userId: "",
            postId: idPost,
            content: "Bài viết của bạn bị tố cáo từ cộng đồng",
            contentEN: "Your post has been reported by the community",
            class: "like",
            seen: false,
          });
        })
        .catch((err) => console.log(err));
    }
    createReport();
  };

  return (
    <ReportStyles showReport={showReport} showContentEn={showContentEn}>
      {showReport && (
        <div className="overlay" onClick={() => setShowReport(false)}></div>
      )}

      <div className="report">
        <h1>{t("titleReport")}</h1>
        <form className="form-submit" onSubmit={handleSubmit(handleReport)}>
          {itemLng === "vn" ? (
            <div className="option-reason">
              <Radio
                name="status"
                control={control}
                checked={reasonOne === DataReport.reasonOne}
                onClick={handleSetReasonOne}
                value={DataReport.reasonOne}
              >
                {DataReport.reasonOne}
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={reasonTwo === DataReport.reasonTwo}
                onClick={handleSetReasonTwo}
                value={DataReport.reasonTwo}
              >
                {DataReport.reasonTwo}
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={reasonThree === DataReport.reasonThree}
                onClick={handleSetReasonThree}
                value={DataReport.reasonThree}
              >
                {DataReport.reasonThree}
              </Radio>
            </div>
          ) : (
            <div className="option-reason">
              <Radio
                name="status"
                control={control}
                checked={reasonOneEN === DataReport.reasonOneEN}
                onClick={handleSetReasonOne}
                value={DataReport.reasonOneEN}
              >
                {DataReport.reasonOneEN}
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={reasonTwoEN === DataReport.reasonTwoEN}
                onClick={handleSetReasonTwo}
                value={DataReport.reasonTwoEN}
              >
                {DataReport.reasonTwoEN}
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={reasonThreeEN === DataReport.reasonThreeEN}
                onClick={handleSetReasonThree}
                value={DataReport.reasonThreeEN}
              >
                {DataReport.reasonThreeEN}
              </Radio>
            </div>
          )}

          <div className="description">
            <div className="title-desc">
              <p>{t("description")}</p>
              <div className="show-content">
                <div className="vn" onClick={() => setShowContentEN(false)}>
                  VN
                </div>
                <div className="en" onClick={() => setShowContentEN(true)}>
                  EN
                </div>
              </div>
            </div>
            <Textarea
              name="report"
              id="report"
              control={control}
              className="content-vn"
            ></Textarea>
            <Textarea
              name="reportEn"
              id="reportEn"
              control={control}
              className="content-en"
            ></Textarea>
          </div>

          <Button
            className="button-report"
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {t("send")}
          </Button>
        </form>
      </div>
    </ReportStyles>
  );
};

export default Report;
