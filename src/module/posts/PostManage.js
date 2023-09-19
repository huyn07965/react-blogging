import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  IconDelete,
  LabelStatus,
  PostList,
  Table,
} from "../../components";
import { useEffect } from "react";
import { debounce } from "lodash";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useAuth } from "../../contexts/auth-context";
import { baseUrl, roleStatus } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import axios from "axios";
import usePagination from "../../hooks/usePagination";
import { Link } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import Swal from "sweetalert2";
import useViewport from "../../hooks/useViewPort";

const PostManageStyles = styled.div`
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
  .item-post {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .img-post {
    width: 66px;
    height: 55px;
    border-radius: 4px;
    object-fit: cover;
  }
  .item-post-info {
    max-width: 400px;
    white-space: pre-wrap;
  }
  .item-post-name {
    font-weight: 500;
  }
  .item-post-description {
    color: ${(props) => props.theme.greyDark};
    font-size: 14px;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${(props) => props.theme.greyDark};
  }
  .load-more-button {
    margin: 40px auto;
    max-width: 250px;
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

const PostManage = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const [postList, setPostList] = useState([]);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState();
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 600;
  const itemLng = localStorage.getItem("lng");

  const handleChange = (e) => {
    setReload(e);
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl.getPostManage)
        .then((result) => setPostList(result.data))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [reload]);

  const handleFilterData = (type) => {
    switch (type) {
      case 0:
        async function fetchDataAll() {
          await axios
            .get(baseUrl.getPostManage)
            .then((result) => setPostList(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataAll();
        break;
      case 1:
        async function fetchDataActive() {
          await axios
            .get(baseUrl.getPostFilterManage + 1)
            .then((result) => setPostList(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataActive();
        break;
      case 2:
        async function fetchDataPending() {
          await axios
            .get(baseUrl.getPostFilterManage + 2)
            .then((result) => setPostList(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataPending();
        break;
      case 3:
        async function fetchDataReject() {
          await axios
            .get(baseUrl.getPostFilterManage + 3)
            .then((result) => setPostList(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataReject();
        break;
      default:
        break;
    }
  };
  const handleSearchText = debounce((e) => {
    setSearch(e.target.value);
  }, 500);

  const { dataSearch } = useSearch(postList, search);

  const handleSearch = () => {
    setPostList(dataSearch);
  };
  const { prePage, changePage, nextPage, record, numbers, currentPage } =
    usePagination(postList, 10);
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
          .delete(baseUrl.deletePostReject)
          .then((result) => {
            Swal.fire("Deleted!", "Post reject has been deleted.", "success");
            setReload(!reload);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  useEffect(() => {
    document.title = "Post Manage Page";
  });
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <PostManageStyles>
      <DashboardHeading
        title={t("post")}
        desc={t("managePost")}
      ></DashboardHeading>
      <div className="search-post">
        <Button to="/manage/add-post" className="header-button" height="42px">
          {t("addNew")}
        </Button>
        <div className="search-body">
          <input
            type="text"
            className="search"
            placeholder={`${t("searchPost")} ...`}
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
            <th>{t("post")}</th>
            <th>{t("category")}</th>
            <th>{t("author")}</th>
            <th>{t("status")}</th>
            <th>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {record?.map((post) => (
            <PostList
              key={post?._id}
              post={post}
              admin={true}
              onChange={(e) => handleChange(e)}
              urlDeletePost={baseUrl.deletePost}
            ></PostList>
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
    </PostManageStyles>
  );
};

export default PostManage;
