import React from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useState } from "react";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import slugify from "slugify";

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
    flex-wrap: wrap;
    gap: 10px;
  }
  .blogging {
    max-width: 105px;
    object-fit: cover;
    display: block;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 20px;
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
  .search-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    height: 55px;
    width: 100%;
  }
  .search {
    border-radius: 5px;
    height: 50px;
    padding-left: 50px;
    width: 100%;
    border: 1px solid ${(props) => props.theme.greyLight};
    background-color: ${(props) => props.theme.greyLight};
    :focus {
      border: 1px solid ${(props) => props.theme.primary};
      background-color: white;
    }
    ::-webkit-input-placeholder {
      color: #c4c4c4;
    }
    ::-moz-input-placeholder {
      color: #c4c4c4;
    }
  }
  .search-icon {
    width: 40px;
    height: 40px;
    /* background-color: ${(props) => props.theme.primary}; */
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
  }
  .show-search-icon {
    border-left: 1.5px solid #c4c4c4;
    padding-left: 10px;
    position: absolute;
    right: 15px;
  }
  .icon {
    width: 25px;
    height: 25px;
    color: white;
  }
  .show-icon {
    width: 25px;
    height: 25px;
    color: #c4c4c4;
  }
  .icon-back {
    position: absolute;
    left: 15px;
    width: 20px;
    height: 20px;
    color: black;
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
    height: 40px;
    font-weight: 600;
  }
  @media screen and (max-width: 600px) {
    .header-main {
      margin: 0 auto;
      align-items: flex-end;
    }
    .header-left {
      flex-direction: column;
      align-items: flex-start;
    }
    .menu {
      gap: 20px;
      margin-left: 0;
      &-item {
        padding: 0;
      }
    }
    .search-icon {
      height: 35px;
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
      padding: 0 20px;
      height: 35px;
      font-weight: 500;
      font-size: 16px;
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
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const handleSearch = debounce((e) => {
    setSearch(
      slugify(e?.target.value, {
        lower: true,
        replacement: " ",
        trim: true,
      })
    );
  }, 500);
  const nextSearch = () => {
    if (search?.length > 0) {
      navigate(`/search?title=${search}`);
    } else {
      toast.error("Please enter the keyword to find");
    }
  };
  return (
    <HeaderStyles>
      <div className="container">
        {showSearch ? (
          <div className="search-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="icon-back"
              onClick={() => setShowSearch(!showSearch)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
            <input
              type="text"
              name="search"
              placeholder="Enter Keyword"
              onChange={handleSearch}
              className="search"
            />
            <div className="show-search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="show-icon"
                onClick={nextSearch}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div className="header-main">
            <div className="header-left">
              <NavLink to="/">
                <img src="/blogging.png" alt="blogging" className="blogging" />
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
              <div className="search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.2"
                  stroke="currentColor"
                  className="icon"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
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
                  {/* <div className="user-name">
                  <h3 onClick={() => navigate(`/userinfo?id=${userInfo.uid}`)}>
                    {userInfo?.userName}
                  </h3>
                </div> */}
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
        )}
      </div>
    </HeaderStyles>
  );
};

export default Header;
