import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useTranslation } from "react-i18next";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  LabelStatus,
  Table,
} from "../../components";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/auth-context";
import { baseUrl, roleStatus } from "../../utils/constants";
import axios from "axios";
import usePagination from "../../hooks/usePagination";

const ReportManageStyles = styled.div`
  width: 100%;
  .icon-manage {
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${(props) => props.theme.greyDark};
  }
  .search-post {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
  }
  .search {
    max-width: 300px;
    padding: 16px;
    border: 1px solid ${(props) => props.theme.greyLight};
    border-radius: 5px;
  }
  .header-button {
    padding: 10px;
    max-width: 230px;
    min-width: 120px;
    flex-wrap: nowrap;
  }
  .button {
    margin: 0 auto;
    max-width: 250px;
    margin-top: 20px;
  }
  .td-info {
    white-space: nowrap;
  }
  .info {
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .image {
    display: flex;
    flex-shrink: inherit;
    object-fit: cover;
    min-width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .info-name {
    flex: 1;
  }
  .info-time {
    color: ${(props) => props.theme.grey6B};
    font-size: 14px;
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    padding: 30px 0 20px 0;
    gap: 10px;
  }
  .page-item {
    padding: 7px 15px;
    border-radius: 3px;
    font-weight: 500;
  }
  .active {
    background-color: ${(props) => props.theme.primary};
    color: white;
  }
  .page-link {
    padding: 10px;
    width: 40px;
    height: 40px;
    background-color: ${(props) => props.theme.primary};
    color: white;
    border-radius: 3px;
  }
  .page {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
    padding: 10px 0 20px 0;
    cursor: pointer;
  }
  .all-text {
    font-weight: 500;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
    color: white;
    cursor: pointer;
    padding: 8px 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const ReportManage = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const [report, setReport] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const itemLng = localStorage.getItem("lng");

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl.getReport)
        .then((result) => setReport(result.data))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [reload]);

  const handleFilterData = (type) => {
    switch (type) {
      case 0:
        async function fetchDataAll() {
          await axios
            .get(baseUrl.getReport)
            .then((result) => setReport(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataAll();
        break;
      case 1:
        async function fetchDataActive() {
          await axios
            .get(baseUrl.getReportFilter + 1)
            .then((result) => setReport(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataActive();
        break;
      case 2:
        async function fetchDataPending() {
          await axios
            .get(baseUrl.getReportFilter + 2)
            .then((result) => setReport(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataPending();
        break;

      default:
        break;
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .delete(baseUrl.deleteReport + id)
          .then((result) => {
            setReload(!reload);
            Swal.fire("Deleted!", "Report has been deleted.", "success");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return <LabelStatus type="success">Active</LabelStatus>;
      case 2:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      default:
        break;
    }
  };

  const { prePage, changePage, nextPage, record, numbers, currentPage } =
    usePagination(report, 10);
  useEffect(() => {
    document.title = "Report Manage Page";
  });

  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <ReportManageStyles>
      <DashboardHeading title={t("report")} desc={t("manageReport")}>
        {/* <div className="search-post">
          <input
            type="text"
            className="search"
            placeholder={`${t("searchUser")} ...`}
            // onChange={handleSearch}
          />
        </div> */}
      </DashboardHeading>
      <div className="page">
        <div className="status">
          <div onClick={() => handleFilterData(1)}>
            <LabelStatus type="success">Active</LabelStatus>
          </div>
          <div onClick={() => handleFilterData(2)}>
            <LabelStatus type="warning">Pending</LabelStatus>
          </div>
          <div className="all-text" onClick={() => handleFilterData(0)}>
            {t("all")}
          </div>
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>{t("reason")}</th>
            <th>{t("description")}</th>
            <th>{t("postId")}</th>
            <th>{t("userId")}</th>
            <th>{t("status")}</th>
            <th>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {record?.map((report) => (
            <tr key={report._id}>
              <td title={report._id}>{report._id.slice(0, 5) + "..."}</td>
              <td>{report.reason.length} reason</td>
              <td title={report.description}>
                {report.description ? (
                  <>
                    {itemLng === "vn"
                      ? report.description.slice(0, 20) + "..."
                      : report.descriptionEN.slice(0, 20) + "..."}
                  </>
                ) : (
                  "none"
                )}
              </td>
              <td title={report.idPost}>{report.idPost.slice(0, 5) + "..."}</td>
              <td title={report.idUser}>{report.idUser.slice(0, 5) + "..."}</td>
              <td>{renderStatus(Number(report.status))}</td>
              <td>
                <div className="icon-manage">
                  <ActionView
                    onClick={() =>
                      navigate(`/manage/view-report?id=${report._id}`)
                    }
                  ></ActionView>
                  <ActionEdit
                    onClick={() =>
                      navigate(`/manage/edit-report?id=${report._id}`)
                    }
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => handleDelete(report._id)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
        <ul className="pagination">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="page-link"
              onClick={prePage}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
          </li>
          {numbers?.map((number, i) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <Link href="#" onClick={() => changePage(number)}>
                {number}
              </Link>
            </li>
          ))}
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="page-link"
              onClick={nextPage}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </li>
        </ul>
      </div>
    </ReportManageStyles>
  );
};

export default ReportManage;
