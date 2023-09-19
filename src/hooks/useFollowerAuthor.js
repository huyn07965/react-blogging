import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/auth-context";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import socketIo from "socket.io-client";

export default function useFollowAuthor({
  authId,
  follower,
  totalFollow,
  totalFollower,
}) {
  const { userInfo, follows } = useAuth();
  const { t } = useTranslation();
  const [follow, setFollow] = useState();
  const watchFollow = userInfo?.follow;
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
    const checkIconActive = watchFollow?.filter((item) => item?.id == authId);
    checkIconActive?.map((item) => setFollow(item?.iconFollow));
  }, [authId, follows, watchFollow, event]);

  const handleFollowAuthor = async () => {
    const userId = userInfo._id;
    const array = userInfo?.follow;
    const checkArray = array.filter((item) => item?.id === authId);
    if (checkArray?.length == 0) {
      const totalFL = totalFollow + 1;
      const totalFLer = totalFollower + 1;
      array.push({ id: authId, iconFollow: true });
      follower.push({ id: userId, iconFollow: true });
      await axios
        .put(baseUrl.updateUser + userId, {
          follow: array,
          totalFollow: totalFL,
        })
        .then((result) => {
          axios
            .put(baseUrl.updateUser + authId, {
              follower,
              totalFollower: totalFLer,
            })
            .then((result) => console.log(result.data))
            .catch((err) => console.log(err));
          setFollow(true);
          toast.success(`${t("toastSavePost")}`);
        })
        .catch((err) => console.log(err));
    } else {
      const watchFollow = array.filter((item) => item.id !== authId);
      const watchFollower = follower.filter((item) => item.id !== userId);
      const totalFL = totalFollow - 1;
      const totalFLer = totalFollower - 1;
      await axios
        .put(baseUrl.updateUser + userId, {
          follow: watchFollow,
          totalFollow: totalFL,
        })
        .then((result) => {
          axios
            .put(baseUrl.updateUser + authId, {
              follower: watchFollower,
              totalFollower: totalFLer,
            })
            .then((result) => console.log(result.data))
            .catch((err) => console.log(err));
          setFollow(false);
          toast.error(`${t("toastSavePostFail")}`);
        })
        .catch((err) => console.log(err));
    }
  };
  return {
    handleFollowAuthor,
    follow,
  };
}
