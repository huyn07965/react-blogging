import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  Button,
  LabelStatus,
  Table,
} from "../../components";
import styled from "styled-components";
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
import { db } from "../../firebase-app/firebase-config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { useAuth } from "../../contexts/auth-context";
import { roleStatus } from "../../utils/constants";

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
`;

const UserManage = () => {
  const { userInfo } = useAuth();
  const [user, setUser] = useState();
  const [search, setSearch] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const handleLoadMore = async () => {
    const nextRef = query(
      collection(db, "users"),
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
      setUser([...user, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      const newSearch = search
        ? query(
            colRef,
            where("fullName", ">=", search),
            where("fullName", "<=", search + "utf8")
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
        setUser(result);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [search]);
  const handleDelete = async (docId) => {
    const colRef = doc(db, "users", docId);
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
        return "Moderator";
      case 3:
        return "User";
      default:
        break;
    }
  };
  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 500);
  useEffect(() => {
    document.title = "User Manage Page";
  });
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <UserManageStyles>
      <DashboardHeading title="User" desc="Manage your user">
        <div className="search-post">
          <input
            type="text"
            className="search"
            placeholder="Search post..."
            onChange={handleSearch}
          />
          <Button to="/manage/add-user" className="header-button" height="52px">
            Add New
          </Button>
        </div>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((user) => (
            <tr key={user.id}>
              <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
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
                    onClick={() => navigate(`/userinfo?id=${user.id}`)}
                  ></ActionView>
                  <ActionEdit
                    onClick={() =>
                      navigate(`/manage/update-user?id=${user.id}`)
                    }
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => handleDelete(user.id)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {total > user?.length && (
        <Button className="button" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </UserManageStyles>
  );
};
export default UserManage;
