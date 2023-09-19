import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";

const DashBoardHeaderStyles = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  position: fixed;
  z-index: 1000;
  .logo {
    margin-left: 10px;
    img {
      max-width: 60px;
    }
  }
  .avatar {
    min-width: 55px;
    max-width: 55px;
    height: 55px;
    border-radius: 100%;
    cursor: pointer;
  }
  .image {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 14px;
    color: ${(props) => props.theme.primary};
  }
  @media screen and (max-width: 600px) {
    .logo {
      img {
        max-width: 50px;
      }
    }
    .avatar {
      min-width: 40px;
      max-width: 40px;
      height: 40px;
    }
    h3 {
      display: none;
    }
  }
`;
const DashBoardHeader = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  return (
    <DashBoardHeaderStyles>
      <NavLink className="logo" to="/">
        <img src="/logo.png" alt="" className="logo" />
      </NavLink>
      <div className="header-right">
        <h3>{userInfo?.userName}</h3>
        <div
          to="/profile"
          onClick={() => navigate(`/userinfo?id=${userInfo.uid}`)}
          className="avatar"
        >
          <img src={userInfo?.avatar} className="image" alt="" />
        </div>
      </div>
    </DashBoardHeaderStyles>
  );
};

export default DashBoardHeader;
