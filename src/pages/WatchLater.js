import React from "react";
import { useAuth } from "../contexts/auth-context";
import { useEffect } from "react";
import { useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";
import { Layout, LayoutCategory } from "../components";
import { useTranslation } from "react-i18next";

const WatchLater = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const watchLater = userInfo.watchLater;
  const [post, setPost] = useState([]);
  const [postLater, setPostLater] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "posts");
    const dataPost = query(colRef);
    onSnapshot(dataPost, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc?.id,
          ...doc.data(),
        });
      });
      setPost(result);
    });
  }, []);
  useEffect(() => {
    if (post?.length > 0) {
      const array = [];
      const array1 = [];
      watchLater?.map((item) => array.push(item?.id));
      for (let i = 0; i < array.length; i++) {
        let getData = post.filter((item) => item?.id == array[i]);
        array1.push(getData[0]);
      }
      setPostLater(array1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);
  return (
    <div>
      <Layout>
        <LayoutCategory
          post={postLater}
          title={t("watchLater")}
        ></LayoutCategory>
      </Layout>
    </div>
  );
};

export default WatchLater;
