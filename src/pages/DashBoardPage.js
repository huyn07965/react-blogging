import React from "react";
import styled from "styled-components";
import { DashboardHeading } from "../module";
import { useTranslation } from "react-i18next";

const DashBoardPageStyles = styled.div``;
const DashBoardPage = () => {
  const { t } = useTranslation();
  return (
    <DashBoardPageStyles>
      <DashboardHeading
        title={t("dashboard")}
        desc={t("overviewDashboard")}
      ></DashboardHeading>
    </DashBoardPageStyles>
  );
};

export default DashBoardPage;
