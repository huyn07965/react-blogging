import React from "react";
import styled from "styled-components";
import { Heading } from "../../components";
import PostItem from "./PostItem";
import { useTranslation } from "react-i18next";
import useGetPostCategory from "../../hooks/useGetPostCategory";

const PostRelatedStyles = styled.div`
  padding-bottom: 20px;
  .heading {
    margin-bottom: 20px;
    color: ${(props) => props.theme.primary};
  }
  .post-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 20px;
  }
  @media screen and (max-width: 1324px) {
    .post-item {
      overflow: auto;
    }
  }
  @media screen and (max-width: 1024px) {
    .heading {
      margin-bottom: 10px;
    }
  }
  @media screen and (max-width: 600px) {
    .post-item {
      flex-wrap: wrap;
      overflow: hidden;
    }
  }
`;
const PostRelated = ({ slug }) => {
  const { t } = useTranslation();
  const { postList } = useGetPostCategory(slug);
  const post = postList.slice(0, 4);
  if (!slug) return null;
  return (
    <PostRelatedStyles>
      <Heading className="heading">{t("related")}</Heading>
      <div>
        <div className="post-item">
          {post?.length > 0 &&
            post?.map((item) => (
              <PostItem key={item._id} data={item}></PostItem>
            ))}
        </div>
      </div>
    </PostRelatedStyles>
  );
};

export default PostRelated;
