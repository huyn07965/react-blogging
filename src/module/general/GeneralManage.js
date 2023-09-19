import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ActionEdit, Table } from "../../components";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useAuth } from "../../contexts/auth-context";
import { useTranslation } from "react-i18next";
import { roleStatus } from "../../utils/constants";

const GeneralManageStyles = styled.div`
  .icon-manage {
    color: ${(props) => props.theme.greyDark};
  }
`;
const GeneralManage = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "General Page";
  });
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <GeneralManageStyles>
      <DashboardHeading title={t("general")} desc={t("manageGeneral")}>
        {/* <div className="search-post">
          <input
            type="text"
            className="search"
            placeholder={`${t("searchUser")} ...`}
            // onChange={handleSearch}
          />
        </div> */}
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>{t("manage")}</th>
            <th>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>{t("titleWebsite")}</td>
            <td className="icon-manage">
              <ActionEdit
                onClick={() => navigate("/manage/update-contact")}
              ></ActionEdit>
            </td>
          </tr> */}
          <tr>
            <td>{t("about")}</td>
            <td className="icon-manage">
              <ActionEdit
                onClick={() => navigate("/manage/update-contact")}
              ></ActionEdit>
            </td>
          </tr>
          <tr>
            <td>{t("imageBanner")}</td>
            <td className="icon-manage">
              <ActionEdit
                onClick={() => navigate("/manage/change-image")}
              ></ActionEdit>
            </td>
          </tr>
          <tr>
            <td>{t("titleRule")}</td>
            <td className="icon-manage">
              <ActionEdit onClick={() => navigate("/manage/rule")}></ActionEdit>
            </td>
          </tr>
        </tbody>
      </Table>
    </GeneralManageStyles>
  );
};

export default GeneralManage;
