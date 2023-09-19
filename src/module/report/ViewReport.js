import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { Radio, Textarea } from "../../components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetPostById from "../../hooks/useGetPostById";

const ViewReportStyle = styled.div`
  width: 100%;

  .report {
    width: 50%;
    margin: -20px auto;
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

  .view-port {
    color: ${(props) => props.theme.primary};
    display: flex;
    justify-content: flex-end;
    font-weight: 500;
    cursor: pointer;
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

const ViewReport = () => {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues: {
      report: "",
    },
  });
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
  const [reportData, setReportData] = useState([]);
  const [params] = useSearchParams();
  const idReport = params.get("id");
  const [checkReasonOne, setCheckReasonOne] = useState();
  const [checkReasonTwo, setCheckReasonTwo] = useState();
  const [checkReasonThree, setCheckReasonThree] = useState();
  const [checkReasonOneEN, setCheckReasonOneEN] = useState();
  const [checkReasonTwoEN, setCheckReasonTwoEN] = useState();
  const [checkReasonThreeEN, setCheckReasonThreeEN] = useState();
  const [showContentEn, setShowContentEN] = useState(false);
  const [post, setPost] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl.getReportById + idReport)
        .then((result) => {
          setReportData(result.data);
          setCheckReasonOne(result.data?.reason.indexOf(DataReport.reasonOne));
          setCheckReasonTwo(result.data?.reason.indexOf(DataReport.reasonTwo));
          setCheckReasonThree(
            result.data?.reason.indexOf(DataReport.reasonThree)
          );
          setCheckReasonOneEN(
            result.data?.reasonEN.indexOf(DataReport.reasonOneEN)
          );
          setCheckReasonTwoEN(
            result.data?.reasonEN.indexOf(DataReport.reasonTwoEN)
          );
          setCheckReasonThreeEN(
            result.data?.reasonEN.indexOf(DataReport.reasonThreeEN)
          );
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [idReport]);
  useEffect(() => {
    document.title = "View Report Page";
  });
  useEffect(() => {
    async function getPost() {
      await axios
        .get(baseUrl.getPostById + reportData?.idPost)
        .then((result) => {
          setPost(result.data);
        })
        .catch((err) => console.log(err));
    }
    getPost();
  }, [reportData?.idPost]);
  return (
    <ViewReportStyle showContentEn={showContentEn}>
      <div className="report">
        <h1>{t("reportUser")}</h1>
        <form className="form-submit">
          {itemLng === "vn" ? (
            <div className="option-reason">
              <Radio
                name="status"
                control={control}
                checked={checkReasonOne !== -1}
                // checked={reportData?.reason.indexOf(DataReport.reasonOne)}
                value={DataReport.reasonOne}
              >
                {DataReport.reasonOne}
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={checkReasonTwo !== -1}
                value={DataReport.reasonTwo}
              >
                {DataReport.reasonTwo}
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={checkReasonThree !== -1}
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
                checked={checkReasonOneEN !== -1}
                // checked={reportData?.reason.indexOf(DataReport.reasonOne)}
                value={DataReport.reasonOneEN}
              >
                {DataReport.reasonOneEN}
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={checkReasonTwoEN !== -1}
                value={DataReport.reasonTwoEN}
              >
                {DataReport.reasonTwoEN}
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={checkReasonThreeEN !== -1}
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
              value={reportData.description}
              disabled={true}
            ></Textarea>
            <Textarea
              name="reportEn"
              id="reportEn"
              control={control}
              className="content-en"
              value={reportData.descriptionEN}
              disabled={true}
            ></Textarea>
          </div>

          <p
            className="view-port"
            onClick={() => navigate(`/post/${post?.slug}`)}
          >
            {t("viewPost")}
          </p>
        </form>
      </div>
    </ViewReportStyle>
  );
};

export default ViewReport;
