import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import NotFoundPage from "../../pages/NotFoundPage";
import DashBoardHeader from "./DashBoardHeader";
import SideBar from "./SideBar";
import { useEffect } from "react";

const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  /* .dashboard-header {
    margin-bottom: 120px;
  } */
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
    @media screen and (max-width: 1023.98px) {
      &-heading {
        font-size: 20px;
      }
      &-main {
        grid-template-columns: 100%;
        padding: 20px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .dashboard-header {
      margin-bottom: 100px;
    }
  }
`;
const DashBoardLayout = () => {
  const { userInfo } = useAuth();
  useEffect(() => {
    document.title = "Manage Page";
  });
  if (!userInfo) return <NotFoundPage></NotFoundPage>;
  return (
    <DashboardStyles>
      <div className="dashboard-header">
        <DashBoardHeader></DashBoardHeader>
      </div>
      <div className="dashboard-main">
        <SideBar></SideBar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashBoardLayout;
