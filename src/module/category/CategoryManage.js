import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  Button,
  LabelStatus,
  Table,
} from "../../components";
import { db } from "../../firebase-app/firebase-config";
import DashboardHeading from "../dashboard/DashboardHeading";
import { categoryValue, roleStatus } from "../../utils/constants";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useAuth } from "../../contexts/auth-context";
import { useTranslation } from "react-i18next";

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
    border-radius: 8px;
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
  @media screen and (max-width: 500px) {
    .search {
      max-width: 200px;
    }
  }
`;

const CategoryManage = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const [category, setCategory] = useState();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState();
  const handleLoadMore = async () => {
    const nextRef = query(
      collection(db, "category"),
      startAfter(lastDoc || 0),
      limit(5)
    );
    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategory([...category, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "category");
      const newSearch = search
        ? query(
            colRef,
            where("name", ">=", search),
            where("name", "<=", search + "utf8")
          )
        : query(colRef, limit(5));
      const documentSnapshots = await getDocs(newSearch);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newSearch, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategory(result);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [search]);
  const handleDelete = async (docId) => {
    const colRef = doc(db, "category", docId);
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
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 500);
  useEffect(() => {
    document.title = "Category Manage Page";
  });
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <CategoryManageStyles>
      <DashboardHeading title={t("category")} desc={t("manageCategory")}>
        <div className="search-post">
          <input
            type="text"
            className="search"
            placeholder={`${t("searchCategory")} ...`}
            onChange={handleSearch}
          />
          <Button
            to="/manage/add-category"
            className="header-button"
            height="52px"
          >
            {t("addNew")}
          </Button>
        </div>
      </DashboardHeading>
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
          {category?.map((category) => (
            <tr key={category.id}>
              <td title={category.id}>{category.id.slice(0, 5) + "..."}</td>
              <td>{category.name}</td>
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
                      navigate(`/manage/update-category?id=${category.id}`)
                    }
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => handleDelete(category.id)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {total > category?.length && (
        <Button className="button" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </CategoryManageStyles>
  );
};

export default CategoryManage;
