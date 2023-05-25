import React from "react";
import PostNewestLarge from "../posts/PostNewestLarge";
import PostNewestItems from "../posts/PostNewestItems";
import PostNewestItemsMore from "../posts/PostNewestItemsMore";
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
import PostCategory from "../posts/PostCategory";

const HomeNewestStyles = styled.div`
  .title {
    margin-bottom: -10px;
  }
  .content-newest {
    width: 100%;
    margin: 30px 0 50px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 40px;
  }
  .newest-second {
    background-color: ${(props) => props.theme.greenLight};
    width: 100%;
    height: 100%;
    border-radius: 5px;
    max-width: 570px;
    max-height: 560px;
    padding: 25px 30px;
    position: relative;
  }
  .line-1 {
    position: absolute;
    width: 90%;
    height: 1px;
    background-color: ${(props) => props.theme.greyBf};
    top: 33.5%;
  }
  .line-2 {
    position: absolute;
    width: 90%;
    height: 0.5px;
    background-color: ${(props) => props.theme.greyBf};
    bottom: 33.5%;
  }
  .newest-item {
    display: flex;
    display: flex;
    flex-direction: column;
    row-gap: 45px;
  }
  .newest-more {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .post-item {
    width: 70%;
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 50px;
  }
  .category {
    width: 25%;
    h2 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
    }
  }
  .category-item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 20px;
    font-size: 16px;
  }
  @media screen and (max-width: 1024px) {
    .title {
      margin-top: -20px;
    }
    .content-newest {
      max-width: 1180px;
      margin: 20px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      column-gap: 40px;
    }
    .newest-large {
      margin-bottom: 30px;
    }
    .line-1 {
      width: 95%;
      height: 0.5px;
    }
    .line-2 {
      width: 95%;
    }
    .newest-item {
      row-gap: 20px;
    }
    .title-more {
      margin-top: 30px;
    }
  }
  @media screen and (max-width: 700px) {
    .newest-second {
      padding: 10px 10px;
    }
    .newest-more {
      display: flex;
      flex-direction: column-reverse;
      gap: 20px;
    }
    .post-item {
      width: 100%;
    }
    .category {
      width: 100%;
    }
  }
  @media screen and (max-width: 400px) {
    .newest-second {
      padding: 5px 8px;
    }
  }
`;

const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false)
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
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "category");
      onSnapshot(query(colRef), (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategory(result);
      });
    }
    fetchData();
  }, []);
  const [first, ...other] = posts;
  const newest = posts.slice(1, 4);
  const newestMore = posts.slice(4);
  if (posts?.length <= 0) return null;
  return (
    <HomeNewestStyles>
      <div className="container">
        <div className="title">
          <Heading>Newest Update</Heading>
        </div>
        <div className="content-newest">
          <div className="newest-large">
            <PostNewestLarge data={first}></PostNewestLarge>
          </div>
          <div className="newest-second">
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="newest-item">
              {newest.length > 0 &&
                newest.map((item) => (
                  <PostNewestItems key={v4()} data={item}></PostNewestItems>
                ))}
            </div>
          </div>
        </div>
        <div className="title-more">
          <Heading>More</Heading>
        </div>
        <div className="newest-more">
          <div className="post-item">
            {other.length > 0 &&
              newestMore.map((item) => (
                <PostNewestItemsMore
                  key={v4()}
                  data={item}
                ></PostNewestItemsMore>
              ))}
          </div>
          <div className="category">
            <h2>Category</h2>
            <div className="category-item">
              {category?.map((item) => (
                <PostCategory key={v4()} children={item.name}></PostCategory>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
