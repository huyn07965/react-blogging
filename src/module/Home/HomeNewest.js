import React from "react";
import PostNewestLarge from "../posts/PostNewestLarge";
import PostNewestItems from "../posts/PostNewestItems";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Heading } from "../../components";
import { v4 } from "uuid";

const HomeNewestStyles = styled.div`
  .title {
    margin-bottom: -10px;
  }
  .content-newest {
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 40px;
  }
  .newest-second {
    background-color: ${(props) => props.theme.purpleDark};
    width: 100%;
    height: 100%;
    border-radius: 15px;
    max-width: 570px;
    max-height: 560px;
    padding: 25px 10px;
  }
  .newest-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 30px;
  }
  @media screen and (max-width: 1024px) {
    padding-bottom: 20px;
    .content-newest {
      max-width: 1180px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      column-gap: 40px;
    }
    .newest-second {
      padding: 25px 10px;
    }
    .newest-item {
      row-gap: 20px;
    }
  }
  @media screen and (max-width: 400px) {
    .newest-second {
      padding: 25px 0px;
    }
  }
`;

const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false),
      limit(4)
    );
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, []);
  const [first, ...other] = posts;
  if (posts?.length <= 0) return null;
  return (
    <HomeNewestStyles>
      <div className="container">
        <div className="title">
          <Heading>Newest Update</Heading>
        </div>
        <div className="content-newest">
          <PostNewestLarge data={first}></PostNewestLarge>
          <div className="newest-second">
            <div className="newest-item">
              {other.length > 0 &&
                other.map((item) => (
                  <PostNewestItems key={v4()} data={item}></PostNewestItems>
                ))}
            </div>
          </div>
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
