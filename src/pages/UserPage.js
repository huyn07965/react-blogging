import React, { useEffect, useRef, useState } from "react";
import { IconUserFollow, Layout, LayoutCategory } from "../components";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useGetPostById from "../hooks/useGetPostById";
import { useAuth } from "../contexts/auth-context";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import useFollowAuthor from "../hooks/useFollowerAuthor";
import { useNavigate } from "react-router-dom";
import socketIo from "socket.io-client";
import { useTranslation } from "react-i18next";

const CategoryPageStyles = styled.div`
  .top-author {
    width: 100%;
  }
  .information-top {
    width: 100%;
    padding: 10px 0 20px 0;
  }
  .avatar-author {
    min-width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 40px;
  }
  .avatar-user {
    min-width: 150px;
    height: 150px;
    border: 10px solid ${(props) => props.theme.greyLight};
    border-radius: 100%;
    margin-bottom: 20px;
  }
  .image-avatar {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
  .information-user {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    row-gap: 10px;
    width: 100%;
  }
  .fullName {
    font-size: 28px;
    font-weight: 600;
    color: ${(props) => props.theme.primary};
  }
  .displayName {
    font-weight: 500;
    font-size: 22px;
  }
  .email {
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.greyDark};
  }
  .follow {
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .button-follow {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
  }
  @media screen and (max-width: 600px) {
    .avatar-author {
      min-width: 100%;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    /* .information-user {
      align-items: center;
    } */
  }
`;

const UserPage = () => {
  const { userInfo, follows, setFollows } = useAuth();
  const params = useParams();
  const { postList } = useGetPostById(params.slug);
  const [name] = postList;
  const itemLng = localStorage.getItem("lng");
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState();
  const socket = useRef(null);

  useEffect(() => {
    socket.current = socketIo("https://node-app-blogging.onrender.com");
    socket.current.on("notification", (notification) => {
      setEvent(notification);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl.getUserById + params.slug)
        .then((result) => {
          setUser(result.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [params, event]);
  const { t } = useTranslation();
  const authId = params.slug;
  const follower = user?.follower;
  const totalFollow = userInfo?.totalFollow;
  const totalFollower = user?.totalFollower;
  const { handleFollowAuthor, follow } = useFollowAuthor({
    authId,
    follower,
    totalFollow,
    totalFollower,
  });

  useEffect(() => {
    document.title = "Author Blog Page";
  });
  if (postList?.length <= 0) return null;
  return (
    <Layout>
      <CategoryPageStyles>
        <div className="container">
          <div className="information-top">
            <div className="avatar-author">
              <div className="avatar-user">
                <img className="image-avatar" src="/user.jpg" alt="avatar" />
              </div>
              <div className="information-user">
                <div className="follow">
                  <h3 className="fullName">{user?.fullName}</h3>
                  <div className="button-follow">
                    <IconUserFollow
                      onClick={
                        userInfo
                          ? () => {
                              handleFollowAuthor();
                              setFollows(!follows);
                            }
                          : () => navigate("/sign-in")
                      }
                      follow={follow}
                    ></IconUserFollow>
                  </div>
                </div>

                <h3 className="displayName">{user?.userName}</h3>

                <h4 className="email">{user?.email}</h4>
                <p>
                  {itemLng === "vn"
                    ? user?.description
                    : user?.descriptionEN ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </p>
              </div>
            </div>
          </div>
        </div>
        <LayoutCategory
          post={postList}
          title={`${t("postAuth")} ${name.user?.userName}`}
          author={true}
          loading={loading}
          showFilter={false}
        ></LayoutCategory>
      </CategoryPageStyles>
    </Layout>
  );
};

export default UserPage;
