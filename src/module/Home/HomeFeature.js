import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Heading, HomeFeatureLoading } from "../../components";
import PostItem from "../posts/PostItem";
import { useTranslation } from "react-i18next";
import { baseUrl } from "../../utils/constants";
import axios from "axios";

const HomeFeatureStyles = styled.div`
  .feature {
    width: 100%;
    margin: 10px auto;
  }
  .title {
    margin-bottom: 20px;
  }
  .content-feature {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 20px;
  }
  @media screen and (max-width: 1324px) {
    .title {
      margin-bottom: 10px;
    }
    .heading {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .content-feature {
      overflow: auto;
    }
  }
  @media screen and (max-width: 600px) {
    .content-feature {
      flex-wrap: wrap;
      overflow: hidden;
    }
  }
`;
const HomeFeature = () => {
  const [post, setPost] = useState([]);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      await axios
        .get(baseUrl.getPostHot)
        .then((result) => {
          setPost(result.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  if (post?.length <= 0) return null;
  return (
    <HomeFeatureStyles>
      <div className="container">
        <div className="feature">
          <div className="title">
            <Heading>{t("feature")}</Heading>
          </div>
          {loading ? (
            <HomeFeatureLoading></HomeFeatureLoading>
          ) : (
            <div className="content-feature">
              {post?.map((item) => (
                <PostItem key={item._id} data={item}></PostItem>
              ))}
            </div>
          )}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
