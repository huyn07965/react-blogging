import React from "react";
import styled from "styled-components";
import { Button, Layout } from "../../components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-app/firebase-config";
import { useState } from "react";
import { roleStatus } from "../../utils/constants";
import { useAuth } from "../../contexts/auth-context";
import { signOut } from "firebase/auth";
import NotFoundPage from "../../pages/NotFoundPage";
import { toast } from "react-toastify";

const UserInfoStyles = styled.div`
  .header-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    margin: 40px 0;
    border-bottom: 2px solid ${(props) => props.theme.greyLight};
  }
  .Account {
    color: ${(props) => props.theme.primary};
    font-size: 24px;
    font-weight: 600;
  }
  .sign-out {
    max-width: 150px;
    height: 45px;
  }
  .infomation {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .infomation-left {
    max-width: 30%;
  }
  .avatar {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .avatar-user {
    width: 150px;
    height: 150px;
    border: 10px solid ${(props) => props.theme.greyLight};
    border-radius: 100%;
    margin-bottom: 20px;
  }
  .image {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
  .infomation-user {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    row-gap: 10px;
    width: 100%;
  }
  .displayName {
    font-weight: 600;
    font-size: 22px;
  }
  .email {
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.theme.greyDark};
  }
  .function {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 10px;
    font-weight: 500;
    color: ${(props) => props.theme.greyDark};
  }
  .name-funtion {
    font-size: 20px;
    font-weight: 500;
    color: ${(props) => props.theme.greyDark};
    &.active {
      color: ${(props) => props.theme.primary};
    }
    &:hover {
      color: ${(props) => props.theme.primary};
    }
  }
  .infomation-right {
    margin-left: 80px;
  }
  .infomation-right-bottom {
    margin-top: 30px;
  }
  .title-user {
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .description {
    font-size: 16px;
    font-weight: 400;
    color: ${(props) => props.theme.greyDark};
  }
  .infomaton-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 20px;
  }
  .box {
    width: 49%;
    height: 120px;
    border-radius: 10px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 16px;
  }
  .title-content {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .content {
    font-size: 16px;
    font-weight: 400;
    color: ${(props) => props.theme.greyDark};
  }
  @media screen and (max-width: 680px) {
    .header-user {
      margin: 20px 0;
    }
    .sign-out {
      max-width: 110px;
      height: 40px;
    }
    .infomation {
      flex-wrap: wrap;
      width: 100%;
      row-gap: 30px;
    }
    .infomation-left {
      min-width: 100%;
    }
    .avatar {
      display: flex;
      align-items: center;
      flex-direction: row;
      column-gap: 30px;
    }
    .avatar-user {
      min-width: 150px;
    }
    .function {
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: 50px;
      margin-top: 10px;
      width: 100%;
    }
    .name-funtion {
      font-size: 16px;
      width: 40%;
    }
    .infomation-right {
      margin: auto;
    }
  }
`;

const UserInfo = () => {
  const { userInfo } = useAuth();
  const [params] = useSearchParams();
  const [user, setUser] = useState({});
  const [userAuth, setUserAuth] = useState(false);
  const userId = params.get("id");
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth);
    navigate("/");
    toast.success("Sign Out Successfull!");
  };
  useEffect(() => {
    if (userInfo?.role == roleStatus.Admin) {
      setUserAuth(true);
    }
  }, [userInfo]);
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", userId);
      const singleDoc = await getDoc(docRef);
      setUser(singleDoc.data());
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return "Approved";
      case 2:
        return "Pending";
      case 3:
        return "Reject";
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
  useEffect(() => {
    document.title = "User Infomation Page";
  });
  if (!userInfo) return <NotFoundPage></NotFoundPage>;
  return (
    <UserInfoStyles>
      <Layout>
        <div className="container">
          <div className="header-user">
            <h2 className="Account">User Account</h2>
            {userAuth && (
              <Button
                onClick={() => navigate("/dashboard")}
                className="sign-out"
              >
                Manage
              </Button>
            )}
          </div>
          <div className="infomation">
            <div className="infomation-left">
              <div className="avatar">
                <div className="avatar-user">
                  <img className="image" src={user?.avatar} alt="avatar" />
                </div>
                <div className="infomation-user">
                  <h3 className="displayName">{user?.userName}</h3>
                  <h4 className="email">{user?.email}</h4>
                </div>
              </div>
              <div className="function">
                <Link className="name-funtion active">
                  Persional Infomation
                </Link>
                {userInfo?.role == roleStatus.Admin ? (
                  <h3
                    onClick={() => navigate(`/manage/update-user?id=${userId}`)}
                    className="name-funtion"
                  >
                    Edit Account
                  </h3>
                ) : (
                  <h3
                    className="name-funtion"
                    onClick={() => navigate(`/edit-user?id=${userId}`)}
                  >
                    Edit Account
                  </h3>
                )}

                <Link className="name-funtion">Create Post</Link>
                {userInfo?.email === user?.email && (
                  <p onClick={handleSignOut} className="name-funtion">
                    Sign out
                  </p>
                )}
              </div>
            </div>
            <div className="infomation-right">
              <div className="infomation-right-top">
                <h2 className="title-user">Persional Infomation</h2>
                <h4 className="description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </h4>
              </div>
              <div className="infomation-right-bottom">
                <div className="infomaton-detail">
                  <div className="box">
                    <h3 className="title-content">Name</h3>
                    <h4 className="content">{user?.fullName}</h4>
                  </div>
                  <div className="box">
                    <h3 className="title-content">Created At</h3>
                    <h4 className="content">
                      {new Date(
                        user?.createdAt?.seconds * 1000
                      ).toLocaleDateString("vi-VI")}
                    </h4>
                  </div>
                </div>
                <div className="infomaton-detail">
                  <div className="box">
                    <h3 className="title-content">User Name</h3>
                    <h4 className="content">{user?.userName}</h4>
                  </div>
                  <div className="box">
                    <h3 className="title-content">Status</h3>
                    <h4 className="content">
                      {renderStatus(Number(user?.status))}
                    </h4>
                  </div>
                </div>
                <div className="infomaton-detail">
                  <div className="box">
                    <h3 className="title-content">Authencation</h3>
                    <h4 className="content">
                      {renderRole(Number(user?.role))}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </UserInfoStyles>
  );
};

export default UserInfo;
