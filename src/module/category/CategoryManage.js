import React, { useEffect, useState } from "react";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  Button,
  IconDelete,
  IconSearch,
  LabelStatus,
  Table,
} from "../../components";
import DashboardHeading from "../dashboard/DashboardHeading";
import { categoryValue, roleStatus, baseUrl } from "../../utils/constants";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useTranslation } from "react-i18next";
import axios from "axios";
import usePagination from "../../hooks/usePagination";
import { debounce } from "lodash";
import useSearchCategory from "../../hooks/useSearchCategory";
import useViewport from "../../hooks/useViewPort";

const CategoryManageStyles = styled.div`
  .slug {
    color: ${(props) => props.theme.grey6B};
    font-style: italic;
  }
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
  @media screen and (max-width: 500px) {
    .search {
      max-width: 200px;
    }
  }
`;

const CategoryManage = () => {
  const itemLng = localStorage.getItem("lng");
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [reload, setReload] = useState(true);
  const [search, setSearch] = useState("");
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 600;

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl.getALLCategory)
        .then((result) => setCategory(result.data))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [reload]);

  const handleFilterData = (type) => {
    switch (type) {
      case 0:
        async function fetchDataAll() {
          await axios
            .get(baseUrl.getALLCategory)
            .then((result) => setCategory(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataAll();
        break;
      case 1:
        async function fetchDataApproved() {
          await axios
            .get(baseUrl.getCategoryFilter + 1)
            .then((result) => setCategory(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataApproved();
        break;
      case 2:
        async function fetchDataUnApproved() {
          await axios
            .get(baseUrl.getCategoryFilter + 2)
            .then((result) => setCategory(result.data))
            .catch((err) => console.log(err));
        }
        fetchDataUnApproved();
        break;

      default:
        break;
    }
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
          .delete(baseUrl.deleteCategoryReject)
          .then((result) => {
            Swal.fire(
              "Deleted!",
              "Category reject has been deleted.",
              "success"
            );
            setReload(!reload);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleSearchText = debounce((e) => {
    setSearch(e.target.value);
  }, 500);

  const { dataSearch } = useSearchCategory(category, search);

  const handleSearch = () => {
    setCategory(dataSearch);
  };

  const { prePage, changePage, nextPage, record, numbers, currentPage } =
    usePagination(category, 10);
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
          .delete(baseUrl.deleteCategory + id)
          .then((result) => {
            Swal.fire("Deleted!", "Your category has been deleted.", "success");
            setReload(!reload);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  useEffect(() => {
    document.title = "Category Manage Page";
  });
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <CategoryManageStyles>
      <DashboardHeading
        title={t("category")}
        desc={t("manageCategory")}
      ></DashboardHeading>
      <div className="search-post">
        <Button
          to="/manage/add-category"
          className="header-button"
          height="42px"
        >
          {t("addNew")}
        </Button>
        <div className="search-body">
          <input
            type="text"
            className="search"
            placeholder={`${t("searchCategory")} ...`}
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
            <LabelStatus type="success">Approved</LabelStatus>
          </div>
          <div onClick={() => handleFilterData(2)}>
            <LabelStatus type="warning">UnApproved</LabelStatus>
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
            <th>{t("name")}</th>
            <th>{t("slug")}</th>
            <th>{t("status")}</th>
            <th>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {record?.map((category) => (
            <tr key={category._id}>
              <td title={category._id}>{category._id.slice(0, 5) + "..."}</td>
              <td>
                {itemLng === "vn" ? category.name : category.nameEN || "none"}
              </td>
              <td>
                <span className="slug">{category.slug}</span>
              </td>
              <td>
                {Number(category.status) === categoryValue.Approved && (
                  <LabelStatus className="success" type="success">
                    Approved
                  </LabelStatus>
                )}
                {Number(category.status) === categoryValue.UnApproved && (
                  <LabelStatus type="warning">Unapproved</LabelStatus>
                )}
              </td>
              <td>
                <div className="icon-manage">
                  <ActionView to={category.slug}></ActionView>
                  <ActionEdit
                    onClick={() =>
                      navigate(`/manage/update-category?id=${category._id}`)
                    }
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => handleDelete(category._id)}
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
    </CategoryManageStyles>
  );
};

export default CategoryManage;
