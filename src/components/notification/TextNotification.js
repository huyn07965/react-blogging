import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { baseUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const TextNotificationStyles = styled.div`
  .text-notification {
    border-bottom: 1px solid ${(props) => props.theme.secondary};
    padding: 10px;
    background-color: ${(props) => props.theme.greenLight};
    ${(props) =>
      props.seen === true &&
      css`
        background-color: white;
      `};
  }
`;

const TextNotification = ({ data }) => {
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const itemLng = localStorage.getItem("lng");
  useEffect(() => {
    async function fetchData() {
      axios
        .get(baseUrl.getUserById + data.userId)
        .then((user) => setUser(user.data))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [data]);
  useEffect(() => {
    async function fetchData() {
      axios
        .get(baseUrl.getPostById + data.postId)
        .then((user) => setPost(user.data))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [data]);
  const handleGetNotification = async () => {
    navigate(`/post/${post.slug}`);
    await axios
      .put(baseUrl.updateNotification + data?._id)
      .then((user) => console.log(user))
      .catch((err) => console.log(err));
  };
  return (
    <TextNotificationStyles seen={data.seen}>
      <div className="text-notification" onClick={handleGetNotification}>
        <b>{user?.userName}</b>{" "}
        {itemLng === "vn" ? data.content : data.contentEN}
      </div>
    </TextNotificationStyles>
  );
};

export default TextNotification;
