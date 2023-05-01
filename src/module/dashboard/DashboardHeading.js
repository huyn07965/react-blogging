import React from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import { roleStatus } from "../../utils/constants";

const DashboardHeadingStyles = styled.div`
  margin-bottom: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .dashboard-heading {
    color: ${(props) => props.theme.primary};
  }
`;
const DashboardHeading = ({ title = "", desc = "", children }) => {
  const { userInfo } = useAuth();
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <DashboardHeadingStyles>
      <div>
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      {children}
    </DashboardHeadingStyles>
  );
};

export default DashboardHeading;
