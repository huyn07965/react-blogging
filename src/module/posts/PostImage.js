import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostImageStyles = styled.div`
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
  @media screen and (max-width: 1024px) {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
  }
`;
const PostImage = ({ url = "", alt = "", className = "", to = "" }) => {
  // if (to != null) {
  //   return (
  //     <NavLink to={`/${to}`} style={{ display: "block" }}>
  //       <PostImageStyles className={className} newestItems={newestItems}>
  //         <img src={url} alt={alt} loading="lazy" />
  //       </PostImageStyles>
  //     </NavLink>
  //   );
  // }

  return (
    <NavLink to={`/post/${to}`}>
      <PostImageStyles className={className}>
        <img src={url} alt={alt} loading="lazy" />
      </PostImageStyles>
      <div className="post-overlay"></div>
    </NavLink>
  );
};

export default PostImage;
