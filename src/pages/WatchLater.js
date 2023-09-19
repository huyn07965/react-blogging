import React from "react";
import { useAuth } from "../contexts/auth-context";
import { useEffect } from "react";
import { useState } from "react";
import { Layout, LayoutCategory } from "../components";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { baseUrl } from "../utils/constants";

const WatchLater = () => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const watchLater = userInfo.watchLater;
  const [post, setPost] = useState([]);
  const [postLater, setPostLater] = useState([]);

  useEffect(() => {
    async function getPost() {
      axios
        .get(baseUrl.getAllPost)
        .then((result) => {
          setPost(result.data);
        })
        .catch((err) => console.log(err));
    }
    getPost();
  }, []);
  useEffect(() => {
    if (post?.length > 0) {
      const array = [];
      const array1 = [];
      watchLater?.map((item) => array.push(item?.id));
      for (let i = 0; i < array.length; i++) {
        let getData = post.filter((item) => item?._id == array[i]);
        array1.push(getData[0]);
      }
      setPostLater(array1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);
  useEffect(() => {
    document.title = "Watch Later Page";
  });
  return (
    <div>
      <Layout>
        <LayoutCategory
          post={postLater}
          title={t("watchLater")}
          showFilter={false}
        ></LayoutCategory>
      </Layout>
    </div>
  );
};

export default WatchLater;
