import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import NotFoundPage from "../../pages/NotFoundPage";
import DashBoardHeader from "./DashBoardHeader";
import SideBar from "./SideBar";
import { useEffect } from "react";

const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;

  .menu {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 8px;
    margin-bottom: 10px;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
    z-index: 100;
    cursor: pointer;
  }
  .icon-menu {
    width: 20px;
    height: 20px;
    color: white;
  }
  .dashboard-children {
    position: absolute;
    padding-bottom: 20px;
    ${(props) =>
      props.showMenu === true &&
      css`
        transform: translateX(320px);
        transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
        width: 77%;
      `}
    ${(props) =>
      props.showMenu === false &&
      css`
        left: 0;
        width: 100%;
        padding: 0 20px;
      `}
  }
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 5px;
      color: ${(props) => props.theme.black};
    }
    &-short-desc {
      font-size: 14px;
      color: ${(props) => props.theme.gray80};
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
    &-children {
      padding-top: 100px;
    }
  }

  @media screen and (max-width: 1280px) {
    .dashboard-children {
      ${(props) =>
        props.showMenu === true &&
        css`
          transform: translateX(220px);
          transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
          width: 75%;
        `}
    }
  }
  @media screen and (max-width: 1023.98px) {
    &-heading {
      font-size: 20px;
    }
    &-main {
      grid-template-columns: 100%;
      padding: 20px;
    }
    .dashboard-children {
      ${(props) =>
        props.showMenu === true &&
        css`
          transform: translateX(0px);
          transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
          width: 96%;
          margin-top: 60px;
        `}
    }
  }
  @media screen and (max-width: 600px) {
    .dashboard-children {
      width: 100%;
      ${(props) =>
        props.showMenu === true &&
        css`
          transform: translateX(1px);
          width: 95%;
          transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
          margin-top: 110px;
        `}
    }
    .menu {
      width: 35px;
      height: 35px;
    }
  }
`;
const DashBoardLayout = () => {
  const { userInfo } = useAuth();
  const [showMenu, setShowMenu] = useState(true);
  useEffect(() => {
    document.title = "Manage Page";
  });
  if (!userInfo) return <NotFoundPage></NotFoundPage>;
  return (
    <DashboardStyles showMenu={showMenu}>
      <div className="dashboard-header">
        <DashBoardHeader></DashBoardHeader>
      </div>
      <div className="dashboard-main">
        <SideBar showMenu={showMenu}></SideBar>
        <div style={{ width: "200px" }}></div>
        <div className="dashboard-children">
          <div className="menu" onClick={() => setShowMenu(!showMenu)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="icon-menu"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <Outlet showMenu={showMenu}></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashBoardLayout;
