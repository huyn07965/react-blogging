import React, { useEffect } from "react";
import { PostImage } from "../../module";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { useState } from "react";

const AuthorStyles = styled.div`
  margin: 40px 0;
  background-color: ${(props) => props.theme.greyLight};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  .image-author {
    width: 237px;
    height: 237px;
    border-radius: 20px;
  }
  .info-author {
    width: 70%;
  }
  .description-author {
    font-size: 18px;
    line-height: 28px;
  }
  h3 {
    font-size: 22px;
    font-weight: 500px;
    color: ${(props) => props.theme.primary};
    margin-bottom: 10px;
  }
  @media screen and (max-width: 700px) {
    padding: 10px 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .info-author {
    width: 100%;
  }
`;

const Author = ({ userId = "" }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", userId);
      const docSnapShot = await getDoc(docRef);
      if (docSnapShot.data()) {
        setUser(docSnapShot.data());
      }
    }
    fetchData();
  }, [userId]);
  console.log(user);
  if (!userId) return null;
  return (
    <AuthorStyles>
      <PostImage
        className="image-author"
        url={user.avatar}
        alt="author"
      ></PostImage>
      <div className="info-author">
        <h3>{user.fullName}</h3>
        <p className="description-author">
          {user?.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
        </p>
      </div>
    </AuthorStyles>
  );
};

export default Author;
