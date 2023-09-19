import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/auth-context";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import socketIo from "socket.io-client";

export default function useLikeComment({ idComment, likeCmt }) {
  const { userInfo, like } = useAuth();
  const [likeComment, setLikeComment] = useState();
  const [event, setEvent] = useState();
  const socket = useRef(null);

  const watchComment = userInfo?.likeComment;
  useEffect(() => {
    socket.current = socketIo("https://node-app-blogging.onrender.com");
    socket.current.on("notification-likeComment", (notification) => {
      setEvent(notification);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const checkIconActive = watchComment?.filter(
      (item) => item?.id == idComment
    );
    if (checkIconActive?.length > 0) {
      checkIconActive?.map((item) => setLikeComment(item?.iconLikeComment));
    } else {
      setLikeComment(false);
    }
  }, [idComment, like, watchComment, event]);

  const handleLikeComment = async () => {
    const userId = userInfo._id;
    const array = userInfo?.likeComment;
    const checkArray = array.filter((item) => item?.id === idComment);
    if (checkArray?.length == 0 && likeComment == false) {
      const like = likeCmt + 1;
      array.push({ id: idComment, iconLikeComment: true });
      await axios
        .put(baseUrl.updateUser + userId, { likeComment: array })
        .then((result) => {
          axios
            .put(baseUrl.updateComment + idComment, { like })
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
          setLikeComment(true);
          //   if (userInfo?._id !== userIdPost) {
          //     axios.post(baseUrl.createNotification, {
          //       UserReceive: userIdPost,
          //       userId: userInfo?._id,
          //       postId: postIdLike,
          //       content: "da thich bai viet cua ban",
          //       class: "like",
          //       seen: false,
          //     });
          //   }
        })
        .catch((err) => console.log(err));
    } else {
      //   if (postLike >= 0) {
      const like = likeCmt - 1;
      const likeComments = array.filter((item) => item.id !== idComment);
      await axios
        .put(baseUrl.updateUser + userId, { likeComment: likeComments })
        .then((result) => {
          axios
            .put(baseUrl.updateComment + idComment, { like })
            .then((result) => console.log(result.data))
            .catch((err) => console.log(err));
          setLikeComment(false);
        })
        .catch((err) => console.log(err));
    }
  };
  return {
    handleLikeComment,
    likeComment,
  };
}
