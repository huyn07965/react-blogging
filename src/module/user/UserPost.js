import React, { useState } from "react";
import styled from "styled-components";
import { Layout, PostList, Table } from "../../components";
import { useEffect } from "react";
import { debounce } from "lodash";
import { useAuth } from "../../contexts/auth-context";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useTranslation } from "react-i18next";
import useGetPostById from "../../hooks/useGetPostById";
import usePagination from "../../hooks/usePagination";
import { Link } from "react-router-dom";

const PostManageStyles = styled.div`
  .container {
    padding: 10px 0 40px 0;
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
  .search-post {
    width: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 20px;
  }
  .search {
    max-width: 400px;
    width: 100%;
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

const UserPost = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const { postList } = useGetPostById(userInfo?._id, search);
  const { prePage, changePage, nextPage, record, numbers, currentPage } =
    usePagination(postList, 10);

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 500);
  useEffect(() => {
    document.title = "Post Manage Page";
  });
  return (
    <Layout>
      <PostManageStyles>
        <div className="container">
          <DashboardHeading
            title={t("myPost")}
            desc={t("manageMyPost")}
          ></DashboardHeading>
          {/* <div className="search-post">
            <input
              type="text"
              className="search"
              placeholder={`${t("searchPost")} ...`}
              onChange={handleSearch}
            />
          </div> */}
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
                <PostList post={post}></PostList>
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
                  className={`page-item ${
                    currentPage === number ? "active" : ""
                  }`}
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
        </div>
      </PostManageStyles>
    </Layout>
  );
};

export default UserPost;
