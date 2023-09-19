import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/auth-context";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import socketIo from "socket.io-client";

export default function useLikePost({ postIdLike, postLike, userIdPost }) {
  const { userInfo, like } = useAuth();
  const { t } = useTranslation();
  const [likePost, setLikePost] = useState();
  const [event, setEvent] = useState();
  const socket = useRef(null);

  const watchPost = userInfo?.likePost;
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
    const checkIconActive = watchPost?.filter((item) => item?.id == postIdLike);
    if (checkIconActive?.length > 0) {
      checkIconActive?.map((item) => setLikePost(item?.iconLikePost));
    } else {
      setLikePost(false);
    }
  }, [postIdLike, like, watchPost, event]);

  const handleLikePost = async () => {
    const userId = userInfo._id;
    const array = userInfo?.likePost;
    const checkArray = array.filter((item) => item?.id === postIdLike);
    if (checkArray?.length == 0 && likePost == false) {
      const like = postLike + 1;
      array.push({ id: postIdLike, iconLikePost: true });
      await axios
        .put(baseUrl.updateUser + userId, { likePost: array })
        .then((result) => {
          axios
            .put(baseUrl.updatePost + postIdLike, { like })
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
          setLikePost(true);
          if (userInfo?._id !== userIdPost) {
            axios.post(baseUrl.createNotification, {
              UserReceive: userIdPost,
              userId: userInfo?._id,
              postId: postIdLike,
              content: "đã thích bài viết của bạn",
              contentEN: "has liked your post",
              class: "like",
              seen: false,
            });
          }
        })
        .catch((err) => console.log(err));

      // toast.success(`${t("toastSavePost")}`);
    } else {
      if (postLike >= 0) {
        const like = postLike - 1;
        const likePosts = array.filter((item) => item.id !== postIdLike);
        await axios
          .put(baseUrl.updateUser + userId, { likePost: likePosts })
          .then((result) => {
            axios
              .put(baseUrl.updatePost + postIdLike, { like })
              .then((result) => console.log(result.data))
              .catch((err) => console.log(err));
            setLikePost(false);
          })
          .catch((err) => console.log(err));

        // toast.error(`${t("toastSavePostFail")}`);
      }
    }
  };
  return {
    handleLikePost,
    likePost,
  };
}
