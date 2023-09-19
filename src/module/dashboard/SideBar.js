import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import { roleStatus } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const SidebarStyles = styled.div`
  width: 300px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  border-radius: 12px;
  position: fixed;
  z-index: 10;
  ${(props) =>
    props.showMenu === true &&
    css`
      transform: translateX(0);
      transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
    `}
  ${(props) =>
    props.showMenu === false &&
    css`
      transform: translateX(-1000px);
      transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
    `}
  padding-top: 80px;
  .menu-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 14px 20px;
    font-weight: 500;
    color: ${(props) => props.theme.greyDark};
    margin-bottom: 20px;
    cursor: pointer;
    &.active,
    &:hover {
      background: #f1fbf7;
      color: ${(props) => props.theme.primary};
    }
  }
  .icon {
    width: 25px;
    height: 25px;
  }
  @media screen and (max-width: 1280px) {
    width: 200px;
    .menu-item {
      padding: 8px 20px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    height: 30%;
    display: flex;
    flex-wrap: wrap;
    /* column-gap: 10px; */
    justify-content: space-between;
    width: 100%;
    margin-bottom: 30px;
    .menu-text {
      display: none;
    }
    .icon {
      min-width: 25px;
      min-height: 25px;
    }
  }

  @media screen and (max-width: 600px) {
    height: 40%;
  }

  @media screen and (max-width: 499.98px) {
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 30px;
    .menu-text {
      display: none;
    }
    .icon {
      min-width: 25px;
      min-height: 25px;
    }
  }
`;
const sidebarLinks = [
  {
    title: "dashboard",
    url: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "post",
    url: "/manage/post",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
        />
      </svg>
    ),
  },
  {
    title: "category",
    url: "/manage/category",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    title: "user",
    url: "/manage/user",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
  },
  {
    title: "Report",
    url: "/manage/report",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
        />
      </svg>
    ),
  },
  {
    title: "general",
    url: "/manage/general",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.6"
        stroke="currentColor"
        className="icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
  },
  {
    title: "signOut",
    url: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),
    onClick: true,
  },
];
const SideBar = ({ showMenu }) => {
  const { userInfo, setSignIn, signIn } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setSignIn(!signIn);
    navigate("/");
    toast.success(`${t("signOutSuccess")}`);
  };
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <SidebarStyles className="sidebar" showMenu={showMenu}>
      {sidebarLinks.map((link) => {
        if (link.onClick)
          return (
            <div className="menu-item" onClick={handleSignOut} key={link.title}>
              <span className="menu-icon">{link.icon}</span>
              <span className="menu-text">{t(`${link.title}`)}</span>
            </div>
          );
        return (
          <NavLink to={link.url} className="menu-item" key={link.title}>
            <span className="menu-icon">{link.icon}</span>
            <span className="menu-text">{t(`${link.title}`)}</span>
          </NavLink>
        );
      })}
    </SidebarStyles>
  );
};

export default SideBar;
