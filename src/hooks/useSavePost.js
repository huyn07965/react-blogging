import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/auth-context";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import socketIo from "socket.io-client";

export default function useSavePost(postId) {
  const { userInfo, save } = useAuth();
  const { t } = useTranslation();
  const [savePost, setSavePost] = useState();
  const watchPost = userInfo?.watchLater;
  const [event, setEvent] = useState();
  const [totalSave, setTotalSave] = useState();
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
      axios
        .get(baseUrl.getPostById + postId)
        .then((result) => setTotalSave(result?.data.save))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [postId, event]);

  useEffect(() => {
    const checkIconActive = watchPost?.filter((item) => item?.id == postId);
    checkIconActive?.map((item) => setSavePost(item?.iconWatchLater));
  }, [postId, save, watchPost]);

  const handleWatchLater = async () => {
    const userId = userInfo._id;
    const array = userInfo?.watchLater;
    const checkArray = array.filter((item) => item?.id === postId);
    if (checkArray?.length == 0) {
      array.push({ id: postId, iconWatchLater: true });
      const save = totalSave + 1;
      await axios
        .put(baseUrl.updateUser + userId, { watchLater: array })
        .then((result) => {
          axios
            .put(baseUrl.updatePost + postId, { save })
            .then(() => console.log("Save successfully"))
            .catch((err) => console.log(err));
          setSavePost(true);
          toast.success(`${t("toastSavePost")}`);
        })
        .catch((err) => console.log(err));
    } else {
      const save = totalSave - 1;
      const watchLater = array.filter((item) => item.id !== postId);
      await axios
        .put(baseUrl.updateUser + userId, { watchLater })
        .then((result) => {
          axios
            .put(baseUrl.updatePost + postId, { save })
            .then(() => console.log("Remove save successfully"))
            .catch((err) => console.log(err));
          setSavePost(false);
          toast.error(`${t("toastSavePostFail")}`);
        })
        .catch((err) => console.log(err));
    }
  };
  return {
    handleWatchLater,
    savePost,
  };
}
