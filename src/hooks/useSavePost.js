import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";
import { useTranslation } from "react-i18next";

export default function useSavePost(postId) {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const [savePost, setSavePost] = useState(false);
  const watchPost = userInfo?.watchLater;

  useEffect(() => {
    const checkIconActive = watchPost?.filter((item) => item?.id == postId);
    checkIconActive?.map((item) => setSavePost(item?.iconWatchLater));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWatchLater = async () => {
    const colRef = doc(db, "users", userInfo.uid);
    const array = userInfo?.watchLater;
    const checkArray = array.filter((item) => item?.id == postId);
    if (checkArray?.length == 0) {
      array.push({ id: postId, iconWatchLater: true });
      await updateDoc(colRef, {
        watchLater: array,
      });
      setSavePost(true);
      toast.success(`${t("toastSavePost")}`);
    } else {
      const checkArray = array.filter((item) => item.id !== postId);
      await updateDoc(colRef, {
        watchLater: checkArray,
      });
      setSavePost(false);
      toast.error(`${t("toastSavePostFail")}`);
    }
  };
  return {
    handleWatchLater,
    savePost,
  };
}
