import React from "react";
import styled from "styled-components";
import { Button, Layout } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { roleStatus } from "../../utils/constants";
import { useAuth } from "../../contexts/auth-context";
import NotFoundPage from "../../pages/NotFoundPage";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

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
  .information {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .information-left {
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
  .information-user {
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
  .name-function {
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
  .information-right {
    margin-left: 80px;
  }
  .information-right-bottom {
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
  .information-detail {
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
    .information {
      flex-wrap: wrap;
      width: 100%;
      row-gap: 30px;
    }
    .information-left {
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
    .name-function {
      font-size: 16px;
      width: 40%;
    }
    .information-right {
      margin: auto;
    }
  }
`;

const UserInfo = () => {
  const { userInfo, signIn, setSignIn } = useAuth();
  const itemLng = localStorage.getItem("lng");

  const { t } = useTranslation();
  const [userAuth, setUserAuth] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setSignIn(!signIn);
    navigate("/");
    toast.success(`${t("signOutSuccess")}`);
  };
  useEffect(() => {
    if (userInfo?.role == roleStatus.Admin) {
      setUserAuth(true);
    }
  }, [userInfo]);

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
        return "Author";
      case 3:
        return "User";
      default:
        break;
    }
  };
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  useEffect(() => {
    document.title = "User information Page";
  });
  if (!userInfo) return <NotFoundPage></NotFoundPage>;
  return (
    <UserInfoStyles>
      <Layout>
        <div className="container">
          <div className="header-user">
            <h2 className="Account">{t("userAccount")}</h2>
            {userAuth && (
              <Button
                onClick={() => navigate("/dashboard")}
                className="sign-out"
              >
                {t("manage")}
              </Button>
            )}
          </div>
          <div className="information">
            <div className="information-left">
              <div className="avatar">
                <div className="avatar-user">
                  <img className="image" src={userInfo?.avatar} alt="avatar" />
                </div>
                <div className="information-user">
                  <h3 className="displayName">{userInfo?.userName}</h3>
                  <h4 className="email">{userInfo?.email}</h4>
                </div>
              </div>
              <div className="function">
                {userInfo?.role == roleStatus.Admin ? (
                  <h3
                    onClick={() =>
                      navigate(`/manage/update-user?id=${userInfo._id}`)
                    }
                    className="name-function active"
                  >
                    {t("editAccount")}
                  </h3>
                ) : (
                  <h3
                    className="name-function active"
                    onClick={() => navigate(`/edit-user?id=${userInfo._id}`)}
                  >
                    {t("editAccount")}
                  </h3>
                )}
                <h3
                  className="name-function"
                  onClick={() => navigate(`/watch-later`)}
                >
                  {t("watchLater")}
                </h3>
                {userInfo?.role === 2 || userInfo?.role === 1 ? (
                  <>
                    {userInfo?.role === roleStatus.Admin ? (
                      <Link className="name-function" to="/manage/add-post">
                        {t("createPost")}
                      </Link>
                    ) : (
                      <Link to="/create-post" className="name-function">
                        {t("createPost")}
                      </Link>
                    )}
                  </>
                ) : (
                  <></>
                )}
                {userInfo?.role === 2 || userInfo?.role === 1 ? (
                  <>
                    {userInfo?.role == roleStatus.Admin ? (
                      <Link className="name-function" to="/manage/user">
                        {t("myPost")}
                      </Link>
                    ) : (
                      <Link to="/user-post" className="name-function">
                        {t("myPost")}
                      </Link>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {userInfo?.email && (
                  <p onClick={handleSignOut} className="name-function">
                    {t("signOut")}
                  </p>
                )}
              </div>
            </div>
            <div className="information-right">
              <div className="information-right-top">
                <h2 className="title-user">{t("personalInfo")}</h2>
                <h4 className="description">
                  {itemLng === "vn"
                    ? userInfo?.description
                    : userInfo?.descriptionEN ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </h4>
              </div>
              <div className="information-right-bottom">
                <div className="information-detail">
                  <div className="box">
                    <h3 className="title-content">{t("fullName")}</h3>
                    <h4 className="content">{userInfo?.fullName}</h4>
                  </div>
                  <div className="box">
                    <h3 className="title-content">{t("createAt")}</h3>
                    <h4 className="content">
                      {new Date(userInfo?.createdAt).toLocaleDateString(
                        "vi-VI"
                      )}
                    </h4>
                  </div>
                </div>
                <div className="information-detail">
                  <div className="box">
                    <h3 className="title-content">{t("userName")}</h3>
                    <h4 className="content">{userInfo?.userName}</h4>
                  </div>
                  <div className="box">
                    <h3 className="title-content">{t("status")}</h3>
                    <h4 className="content">
                      {renderStatus(Number(userInfo?.status))}
                    </h4>
                  </div>
                </div>
                <div className="information-detail">
                  <div className="box">
                    <h3 className="title-content">{t("role")}</h3>
                    <h4 className="content">
                      {renderRole(Number(userInfo?.role))}
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
