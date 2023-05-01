import React from "react";
import Heading from "../header/Heading";
import { PostItem } from "../../module";
import styled from "styled-components";

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
    .heading {
      margin-top: 30px;
      margin-bottom: 20px;
      font-size: 20px;
    }
    .post-item {
      display: flex;
      justify-content: center;
    }
  }
`;
const LayoutCategory = ({ post, title }) => {
  return (
    <LayoutCategoryStyles>
      <div className="container">
        <Heading className="heading">Danh mục {title}</Heading>
        <div className="post">
          <div className="post-item">
            {post?.length > 0 &&
              post?.map((item) => (
                <PostItem key={item.id} data={item}></PostItem>
              ))}
          </div>
        </div>
      </div>
    </LayoutCategoryStyles>
  );
};

export default LayoutCategory;
