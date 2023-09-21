import React from "react";
import PostNewestLarge from "../posts/PostNewestLarge";
import PostNewestItems from "../posts/PostNewestItems";
import PostNewestItemsMore from "../posts/PostNewestItemsMore";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import {
  Heading,
  HomeItemMoreLoading,
  PostNewestItemsLoading,
  PostNewestLargeLoading,
} from "../../components";
import { v4 } from "uuid";
import PostCategory from "../posts/PostCategory";
import { useTranslation } from "react-i18next";
import useViewport from "../../hooks/useViewPort";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import useGetCategory from "../../hooks/useGetCategory";
import usePagination from "../../hooks/usePagination";

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
  .pagination {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
    padding: 30px 0 20px 0;
    gap: 10px;
  }
  .page-item {
    padding: 7px 15px;
    border-radius: 3px;
    font-weight: 500;
  }
  .active {
    background-color: ${(props) => props.theme.primary};
    color: white;
  }
  .page-link {
    padding: 10px;
    width: 40px;
    height: 40px;
    background-color: ${(props) => props.theme.primary};
    color: white;
    border-radius: 3px;
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: ${(props) => props.theme.primary};
      Link {
        font-size: 16px;
      }
      .all-more {
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .icon {
        width: 16px;
        height: 16px;
      }
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
  const [loading, setLoading] = useState([]);
  const { t } = useTranslation();
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 600;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      await axios
        .get(baseUrl.getPost)
        .then((result) => {
          setPosts(result.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);
  const { category } = useGetCategory();
  const [first, ...other] = posts;
  const newest = posts.slice(1, 4);
  const newestMore = posts.slice(4);
  const { prePage, changePage, nextPage, record, numbers, currentPage } =
    usePagination(newestMore, 10);

  if (posts?.length <= 0) return null;
  return (
    <HomeNewestStyles>
      <div className="container">
        <div className="title">
          <Heading>{t("newest")}</Heading>
        </div>
        <div className="content-newest">
          <div className="newest-large">
            {loading ? (
              <PostNewestLargeLoading></PostNewestLargeLoading>
            ) : (
              <PostNewestLarge key={v4()} data={first}></PostNewestLarge>
            )}
          </div>
          {loading ? (
            <PostNewestItemsLoading></PostNewestItemsLoading>
          ) : (
            <div className="newest-second">
              <div className="line-1"></div>
              <div className="line-2"></div>

              <div className="newest-item">
                {newest.length > 0 &&
                  newest.map((item) => (
                    <PostNewestItems
                      key={item?._id}
                      data={item}
                    ></PostNewestItems>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="title-more">
          <Heading>{t("more")}</Heading>
          {isMobile && (
            <div className="all-more">
              <Link to="/blog">{t("all")}</Link>
              <Link to="/blog">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
        {loading ? (
          <HomeItemMoreLoading></HomeItemMoreLoading>
        ) : (
          <div className="newest-more">
            <div className="post-item">
              {other.length > 0 &&
                record.map((item) => (
                  <PostNewestItemsMore
                    key={item?._id}
                    data={item}
                  ></PostNewestItemsMore>
                ))}
            </div>
            <div className="category">
              <h2>{t("category")}</h2>
              <div className="category-item">
                {category?.map((item) => (
                  <PostCategory
                    key={item?._id}
                    children={item.name}
                    to={item?.slug}
                  ></PostCategory>
                ))}
              </div>
            </div>
          </div>
        )}
        <ul className="pagination">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="page-link"
              onClick={prePage}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
          </li>
          {numbers?.map((number, i) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <Link href="#" onClick={() => changePage(number)}>
                {number}
              </Link>
            </li>
          ))}
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="page-link"
              onClick={nextPage}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </li>
        </ul>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
