import React from "react";
import Heading from "../header/Heading";
import { PostItem } from "../../module";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const LayoutCategoryStyles = styled.div`
  .heading {
    margin-top: 40px;
  }
  .post-item {
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 15px;
  }
  @media screen and (max-width: 600px) {
    margin-top: -40px;
    .heading {
      margin-top: 30px;
      font-size: 20px;
    }
    .post-item {
      display: flex;
      justify-content: center;
    }
  }
`;
const LayoutCategory = ({ post, title }) => {
  const { t } = useTranslation();
  return (
    <LayoutCategoryStyles>
      <div className="container">
        <Heading className="heading">{`${t("titleBlog")} ${title}`}</Heading>
        <div className="post">
          <div className="post-item">
            {post?.length > 0 &&
              post?.map((item) => (
                <PostItem key={item?.id} data={item}></PostItem>
              ))}
          </div>
        </div>
      </div>
    </LayoutCategoryStyles>
  );
};

export default LayoutCategory;
