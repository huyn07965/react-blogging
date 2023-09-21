import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { baseUrl } from "../../utils/constants";
import { result } from "lodash";
import TextNotification from "./TextNotification";
import { useAuth } from "../../contexts/auth-context";

const NotificationStyles = styled.div`
  cursor: pointer;
  .body-notification {
    position: relative;
  }
  .notification {
    position: absolute;
    top: 10%;
    right: 10%;
    color: white;
    background-color: red;
    font-size: 10px;
    padding: 4px;
    border-radius: 50px;
  }
  .dropdown-notification {
    padding: 15px;
    width: 300px;
    max-height: 400px;
    background-color: white;
    border: 1px solid ${(props) => props.theme.greyLight};
    border-radius: 8px;
    position: absolute;
    top: 120%;
    transform: translateX(-50%);
    z-index: 50;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 4px;
      border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.primary};
      border-radius: 5px;
    }
  }
`;
const Notification = ({
  showNotification,
  notification,
  setShowNotification,
  onOutsideClick,
}) => {
  const { userInfo } = useAuth();
  const wrapperRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl.getNotificationById + userInfo?._id)
        .then((result) => {
          setData(result.data);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [userInfo?._id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onOutsideClick();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);
  console.log("data lenght", data.length);
  return (
    <NotificationStyles
      onClick={() => setShowNotification(!showNotification)}
      ref={wrapperRef}
    >
      <div className="body-notification">
        <div className="background-icon">
          {data.length > 0 && <div className="notification"></div>}
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
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </div>
        {showNotification && (
          <div className="dropdown-notification">
            {data.map((item) => (
              <TextNotification key={item._id} data={item}></TextNotification>
            ))}
          </div>
        )}
      </div>
    </NotificationStyles>
  );
};

export default Notification;
