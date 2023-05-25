import React from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-app/firebase-config";
import { update } from "lodash";
import { updateProfile } from "firebase/auth";
const WatchLaterStyles = styled.div`
  .icon-watch-later {
    width: 40px;
    height: 40px;
    color: ${(props) => props.theme.primary};
    cursor: pointer;
  }
`;
const WatchLater = (data) => {
  const { userInfo } = useAuth();
  const handleWatchLater = async (values) => {
    const colRef = doc(db, "users", userInfo);
    await updateProfile(auth.currentUser, { later: values });
    await updateDoc(colRef, {
      watchLater: { values },
    });
  };
  return (
    <WatchLaterStyles onClick={(e) => handleWatchLater(data)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="icon-watch-later"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
    </WatchLaterStyles>
  );
};

export default WatchLater;
