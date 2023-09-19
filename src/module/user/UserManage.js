import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useTranslation } from "react-i18next";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  Button,
  IconDelete,
  LabelStatus,
  Table,
} from "../../components";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { useAuth } from "../../contexts/auth-context";
import { baseUrl, roleStatus } from "../../utils/constants";
import axios from "axios";
import usePagination from "../../hooks/usePagination";
import useSearchUser from "../../hooks/useSearchUser";
import useViewport from "../../hooks/useViewPort";

const UserManageStyles = styled.div`
  width: 100%;
  .icon-manage {
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${(props) => props.theme.greyDark};
  }
  .search-post {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 15px 0;
  }
  .search {
    width: 40%;
    padding: 10px 20px;
    border: 1px solid ${(props) => props.theme.greyLight};
    border-radius: 8px;
  }
  .search-body {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }
  .background-icon {
    position: relative;
    padding: 7px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
    color: white;
    cursor: pointer;
  }
  .icon-search {
    width: 25px;
    height: 25px;
    color: white;
  }
  .page {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
`;

const UserManage = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [typeFilter, setTypeFilter] = useState(0);
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 600;

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl.getUser)
        .then((result) => setUser(result.data))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [reload]);

  const handleFilterData = (type) => {
    switch (type) {
      case 0:
        async function fetchDataAll() {
          await axios
            .get(baseUrl.getUser)
            .then((result) => setUser(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataAll();
        break;
      case 1:
        async function fetchDataActive() {
          await axios
            .get(baseUrl.getUserFilter + 1)
            .then((result) => setUser(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataActive();
        break;
      case 2:
        async function fetchDataPending() {
          await axios
            .get(baseUrl.getUserFilter + 2)
            .then((result) => setUser(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataPending();
        break;
      case 3:
        async function fetchDataReject() {
          await axios
            .get(baseUrl.getUserFilter + 3)
            .then((result) => setUser(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataReject();
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
          .delete(baseUrl.deleteUser + id)
          .then((result) => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            setReload(!reload);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const handleDeleteAllReject = () => {
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
          .delete(baseUrl.deleteUserReject)
          .then((result) => {
            Swal.fire("Deleted!", "User reject has been deleted.", "success");
            setReload(!reload);
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
      case 3:
        return <LabelStatus type="danger">Reject</LabelStatus>;
      default:
        break;
    }
  };
  const renderRole = (role) => {
    switch (role) {
      case 1:
        return "Admin";
      case 2:
        return "Author";
      case 3:
        return "User";
      default:
        break;
    }
  };
  const handleSearchText = debounce((e) => {
    setSearch(e.target.value);
  }, 500);

  const { dataSearch } = useSearchUser(user, search);

  const handleSearch = () => {
    setUser(dataSearch);
  };

  const { prePage, changePage, nextPage, record, numbers, currentPage } =
    usePagination(user, 10);

  useEffect(() => {
    document.title = "User Manage Page";
  });
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <UserManageStyles>
      <DashboardHeading
        title={t("user")}
        desc={t("manageUser")}
      ></DashboardHeading>
      <div className="search-post">
        <Button to="/manage/add-user" className="header-button" height="42px">
          {t("addNew")}
        </Button>
        <div className="search-body">
          <input
            type="text"
            className="search"
            placeholder={`${t("searchUser")} ...`}
            onChange={handleSearchText}
          />
          <div onClick={handleSearch} className="background-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.2"
              stroke="currentColor"
              className="icon-search"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="page">
        <div className="status">
          <div onClick={() => handleFilterData(1)}>
            <LabelStatus type="success">Active</LabelStatus>
          </div>
          <div onClick={() => handleFilterData(2)}>
            <LabelStatus type="warning">Pending</LabelStatus>
          </div>
          <div onClick={() => handleFilterData(3)}>
            <LabelStatus type="danger">Reject</LabelStatus>
          </div>
          <div className="all-text" onClick={() => handleFilterData(0)}>
            {t("all")}
          </div>
        </div>
        <div className="all-text" onClick={handleDeleteAllReject}>
          {isMobile ? <IconDelete></IconDelete> : `${t("deleteAllReject")}`}
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>{t("info")}</th>
            <th>{t("userName")}</th>
            <th>{t("email")}</th>
            <th>{t("status")}</th>
            <th>{t("role")}</th>
            <th>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {record?.map((user) => (
            <tr key={user._id}>
              <td title={user._id}>{user._id.slice(0, 5) + "..."}</td>
              <td className="td-info">
                <div className="info">
                  <img src={user.avatar} alt="" className="image" />
                  <div className="info-name">
                    <h3>{user?.fullName}</h3>
                    <time className="info-time">
                      {new Date(
                        user?.createdAt?.seconds * 1000
                      ).toLocaleDateString("vi-VI")}
                    </time>
                  </div>
                </div>
              </td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{renderStatus(Number(user.status))}</td>
              <td>{renderRole(Number(user.role))}</td>
              <td>
                <div className="icon-manage">
                  <ActionView
                    onClick={() => navigate(`/user/${user._id}`)}
                  ></ActionView>
                  <ActionEdit
                    onClick={() =>
                      navigate(`/manage/update-user?id=${user._id}`)
                    }
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => handleDelete(user._id)}
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
    </UserManageStyles>
  );
};
export default UserManage;
