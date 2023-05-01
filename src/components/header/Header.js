import React from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

const menuList = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];
const HeaderStyles = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: 15px;
  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  background-color: #fff;
  z-index: 20;
  .header-main {
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-left {
    display: flex;
    align-items: center;
  }
  .logo {
    max-width: 80px;
    object-fit: cover;
    display: block;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    li {
      list-style: none;
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
    }
  }
  .menu-item {
    position: relative;
    padding: 0 10px;
    &::after {
      content: "";
      text-align: center;
      position: absolute;
      bottom: -15px;
      left: 0;
      width: 0;
      height: 3px;
      background-color: ${(props) => props.theme.primary};
      transition: 0.3s;
    }
    &.active,
    &:hover,
    &:hover::after {
      color: ${(props) => props.theme.primary};
      width: 100%;
    }
    /* &.active::after {
      width: 100%;
    } */
  }
  .avatar {
    min-width: 55px;
    max-width: 55px;
    height: 55px;
    border-radius: 100%;
  }
  .image {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
  .header-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .user-name {
    font-size: 16px;
    color: ${(props) => props.theme.primary};
    font-weight: 400;
  }
  .button {
    max-width: 200px;
    height: 45px;
    font-weight: 600;
  }
  @media screen and (max-width: 600px) {
    .header-main {
      margin: 0 auto;
    }
    .logo {
      max-width: 45px;
    }
    .menu {
      gap: 10px;
      margin-left: 10px;
      li {
        font-size: 16px;
      }
    }
    .avatar {
      min-width: 40px;
      max-width: 40px;
      height: 40px;
    }
    .user-name {
      display: none;
    }
    .button {
      width: 100%;
      padding: 0 10px;
      height: 35px;
      font-weight: 600;
      font-size: 14px;
    }
  }
`;
// function getLastName(name) {
//   if (!name) return "user";
//   const length = name.split(" ").length;
//   return name.split(" ")[length - 1];
// }
const Header = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <div className="header-left">
            <NavLink to="/">
              <img src="/logo.png" alt="monkey-blogging" className="logo" />
            </NavLink>
            <ul className="menu">
              {menuList.map((item) => (
                <li key={item.title}>
                  <NavLink className="menu-item" to={item.url}>
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="header-right">
            {!userInfo ? (
              <Button
                height="55px"
                type="button"
                to="/sign-in"
                className="button"
              >
                Sign In
              </Button>
            ) : (
              <>
                <div className="user-name">
                  <h3 onClick={() => navigate(`/userinfo?id=${userInfo.uid}`)}>
                    {userInfo?.userName}
                  </h3>
                </div>
                <div
                  onClick={() => navigate(`/userinfo?id=${userInfo.uid}`)}
                  className="avatar"
                >
                  <img className="image" src={userInfo?.avatar} alt="" />
                  {/* {getLastName(userInfo?.displayName)} */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
