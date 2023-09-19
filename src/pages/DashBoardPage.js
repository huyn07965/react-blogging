import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DashboardHeading } from "../module";
import { useTranslation } from "react-i18next";
import { Chart, IconReport, Table } from "../components";
import axios from "axios";
import { baseUrl } from "../utils/constants";

const DashBoardPageStyles = styled.div`
  .general-info {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 20px;
  }
  .post {
    width: 16%;
    padding: 20px 0;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;
    padding: 30px 10px;
  }
  .icon-border {
    width: 50px;
    height: 50px;
    background-color: ${(props) => props.theme.greenLight};
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon {
    width: 24px;
    height: 24px;
    color: ${(props) => props.theme.primary};
  }
  .info-all-post {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .title {
    font-weight: bold;
    color: ${(props) => props.theme.primary};
  }
  .total {
    font-weight: bold;
  }
  .show-data {
    margin-top: 40px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 10px;
  }
  .table-data {
    width: 45%;
    h2 {
      color: ${(props) => props.theme.primary};
    }
  }
  .table {
    width: 100%;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  }
  .chart {
    width: 45%;
  }
  @media screen and (max-width: 1280px) {
    .post {
      width: 30%;
    }
  }

  @media screen and (max-width: 700px) {
    .post {
      width: 30%;
    }
    .show-data {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
    .table-data {
      width: 100%;
    }
    .chart {
      width: 100%;
    }
  }
`;
const DashBoardPage = () => {
  const { t } = useTranslation();
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  const [postInMonth, setPostInMonth] = useState({});
  const [userInMonth, setUserInMonth] = useState({});
  const [reportInMonth, setReportInMonth] = useState({});
  const [totalAllPost, setTotalAllPost] = useState({});
  const [totalAllUser, setTotalAllUser] = useState({});
  const [totalAllReport, setTotalReport] = useState({});

  useEffect(() => {
    async function fetchDataPost() {
      await axios
        .get(baseUrl.getAllPost)
        .then((result) => setPost(result.data))
        .catch((err) => console.log(err));
    }
    fetchDataPost();
  }, []);

  useEffect(() => {
    async function fetchDataUser() {
      await axios
        .get(baseUrl.getUserActive)
        .then((result) => setUser(result.data))
        .catch((err) => console.log(err));
    }
    fetchDataUser();
  }, []);

  useEffect(() => {
    async function GetPostInMonth() {
      await axios
        .get(baseUrl.getPostInMonth)
        .then((result) => setPostInMonth(result.data))
        .catch((err) => console.log(err));
    }
    GetPostInMonth();
  }, []);

  useEffect(() => {
    async function GetUserInMonth() {
      await axios
        .get(baseUrl.getUserInMonth)
        .then((result) => setUserInMonth(result.data))
        .catch((err) => console.log(err));
    }
    GetUserInMonth();
  }, []);

  useEffect(() => {
    async function GetReportInMonth() {
      await axios
        .get(baseUrl.getReportInMonth)
        .then((result) => setReportInMonth(result.data))
        .catch((err) => console.log(err));
    }
    GetReportInMonth();
  }, []);

  useEffect(() => {
    async function fetchTotalAllPost() {
      await axios
        .get(baseUrl.getTotalAllPost)
        .then((result) => setTotalAllPost(result.data))
        .catch((err) => console.log(err));
    }
    fetchTotalAllPost();
  }, []);

  useEffect(() => {
    async function fetchTotalAllUser() {
      await axios
        .get(baseUrl.getTotalAllUser)
        .then((result) => setTotalAllUser(result.data))
        .catch((err) => console.log(err));
    }
    fetchTotalAllUser();
  }, []);

  useEffect(() => {
    async function fetchTotalAllReport() {
      await axios
        .get(baseUrl.getTotalAllReport)
        .then((result) => setTotalReport(result.data))
        .catch((err) => console.log(err));
    }
    fetchTotalAllReport();
  }, []);
  useEffect(() => {
    document.title = "DashBoard Page";
  });
  return (
    <DashBoardPageStyles>
      <DashboardHeading
        title={t("dashboard")}
        desc={t("overviewDashboard")}
      ></DashboardHeading>
      <div className="general-info">
        <div className="post">
          <div className="icon-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </div>
          <div className="info-all-post">
            <p className="title">{t("post")}</p>
            <p className="total">{totalAllPost.totalPost}</p>
          </div>
        </div>
        <div className="post">
          <div className="icon-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>

          <div className="info-all-post">
            <p className="title">{t("account")}</p>
            <p className="total">{totalAllUser.totalUser}</p>
          </div>
        </div>
        <div className="post">
          <div className="icon-border">
            <IconReport></IconReport>
          </div>

          <div className="info-all-post">
            <p className="title">{t("report")}</p>
            <p className="total">{totalAllReport.totalReport}</p>
          </div>
        </div>
      </div>
      <div className="show-data">
        <div className="table-data">
          <h2>{t("dataInMonth")}</h2>
          <div className="table">
            <Table>
              <thead>
                <tr>
                  <th>{t("manage")}</th>
                  <th>{t("amount")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t("post")}</td>
                  <td>{postInMonth.totalPost}</td>
                </tr>
                <tr>
                  <td>{t("userInMonth")}</td>
                  <td>{userInMonth.totalUser}</td>
                </tr>
                <tr>
                  <td>{t("report")}</td>
                  <td>{reportInMonth.totalReport}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="chart">
          <Chart post={post} user={user}></Chart>
        </div>
      </div>
    </DashBoardPageStyles>
  );
};

export default DashBoardPage;
