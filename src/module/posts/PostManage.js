import React, { useState } from "react";
import styled from "styled-components";
import { Button, PostList, Table } from "../../components";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { debounce } from "lodash";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useAuth } from "../../contexts/auth-context";
import { roleStatus } from "../../utils/constants";
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
`;

const PostManage = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const [postList, setPostList] = useState();
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newSearch = search
        ? query(
            colRef,
            where("title", ">=", search),
            where("title", "<=", search + "utf8")
          )
        : query(colRef);
      onSnapshot(newSearch, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostList(result);
      });
    }
    fetchData();
  }, [search]);
  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 500);
  useEffect(() => {
    document.title = "Post Manage Page";
  });
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <PostManageStyles>
      <DashboardHeading title={t("post")} desc={t("managePost")}>
        <div className="search-post">
          <input
            type="text"
            className="search"
            placeholder={`${t("searchPost")} ...`}
            onChange={handleSearch}
          />
          <Button to="/manage/add-post" className="header-button" height="52px">
            {t("addNew")}
          </Button>
        </div>
      </DashboardHeading>
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
            <PostList post={post} admin={true}></PostList>
          ))}
        </tbody>
      </Table>
    </PostManageStyles>
  );
};

export default PostManage;
