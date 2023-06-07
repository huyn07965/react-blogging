import React, { useState } from "react";
import styled from "styled-components";
import { LabelStatus, Layout, PostList, Table } from "../../components";
import { useEffect } from "react";
import { debounce } from "lodash";
import { useAuth } from "../../contexts/auth-context";
import useGetPost from "../../hooks/useGetPost";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useTranslation } from "react-i18next";

const PostManageStyles = styled.div`
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
`;

const UserPost = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const { postList } = useGetPost(userInfo.uid, search);
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
          <div className="search-post">
            <input
              type="text"
              className="search"
              placeholder={`${t("searchPost")} ...`}
              onChange={handleSearch}
            />
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
              {postList?.map((post) => (
                <PostList post={post}></PostList>
              ))}
            </tbody>
          </Table>
        </div>
      </PostManageStyles>
    </Layout>
  );
};

export default UserPost;
