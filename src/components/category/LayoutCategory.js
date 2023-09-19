import React, { useEffect, useState } from "react";
import Heading from "../header/Heading";
import { PostItem } from "../../module";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import useGetCategory from "../../hooks/useGetCategory";
import DropDown from "../dropdown/DropDown";
import BlogLoading from "../loadingSkeleton/BlogLoading";
import Button from "../button/Button";
import usePagination from "../../hooks/usePagination";
import { Link } from "react-router-dom";

const LayoutCategoryStyles = styled.div`
  .heading {
    margin-top: 40px;
  }
  .post-item {
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;
    justify-content: flex-start;
    ${(props) =>
      props.author == true &&
      css`
        justify-content: flex-start;
      `}
    ${(props) =>
      props.check == false &&
      css`
        justify-content: flex-start;
      `}
  }
  .header {
    margin: 10px 0 20px 0;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
  .function-filter {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
    gap: 10px;
  }
  .filter {
    width: 15%;
  }
  .category-check {
    ${(props) =>
      props.nameCategory == true &&
      css`
        display: none;
      `}
  }
  .button-filter {
    padding: 7px 20px;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
    border-radius: 5px;
    color: white;
    font-weight: bold;
    font-size: 16px;
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    padding: 30px 0 20px 0;
    gap: 10px;
    ${(props) =>
      props.post.length <= 0 &&
      css`
        display: none;
      `}
  }
  .page-item {
    padding: 7px 15px;
    border-radius: 3px;
    font-weight: 500;
  }
  .page-active {
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
    .filter {
      width: 20%;
    }
  }
  @media screen and (max-width: 600px) {
    .header {
      margin: 30px 0 20px 0;
      align-items: center;
    }
    .filter {
      width: 40%;
    }
    .post-item {
      display: flex;
      justify-content: center;
    }
  }
  @media screen and (max-width: 450px) {
    .filter {
      width: 44%;
    }
  }
`;

const LayoutCategory = ({
  post,
  title,
  checkFilter,
  author,
  getFilter,
  loading,
  showFilter = true,
  nameCategory = false,
}) => {
  const { t } = useTranslation();
  const [selectFilter, setSelectFilter] = useState();
  const [check, setCheck] = useState(true);
  const [selectCategoryFilter, setSelectCategoryFilter] = useState();
  const { category } = useGetCategory();
  const filterOption = [
    {
      name: `${t("filterLikeDecre")}`,
      value: "likeDecrease",
    },
    {
      name: `${t("filterLikeIncre")}`,
      value: "likeIncrease",
    },
    {
      name: `${t("filterViewDecre")}`,
      value: "viewDecrease",
    },
    {
      name: `${t("filterViewIncre")}`,
      value: "viewIncrease",
    },
  ];
  const { prePage, changePage, nextPage, record, numbers, currentPage } =
    usePagination(post, 12);
  useEffect(() => {
    if (post?.length < 4) {
      setCheck(false);
    }
  }, [post]);

  const [filter, setFilter] = useState({
    likeFilter: "",
    viewFilter: "",
    categoryFilter: "",
  });

  const handleFilter = (value) => {
    if (value === "likeDecrease" || value === "likeIncrease") {
      filter.likeFilter = value;
      filter.viewFilter = "";
    } else if (value === "viewIncrease" || value === "viewDecrease") {
      filter.viewFilter = value;
      filter.likeFilter = "";
    } else {
      filter.categoryFilter = value;
    }
    // getFilter(filter);
  };

  const itemLng = localStorage.getItem("lng");

  const handleClickFilter = () => {
    getFilter(filter);
    const data = JSON.stringify(filter);
    localStorage.setItem("filter", data);
    // localStorage.setItem("filter", filter);
  };

  return (
    <LayoutCategoryStyles
      author={author}
      loading={loading}
      check={check}
      post={post}
      nameCategory={nameCategory}
    >
      <div className="container">
        {checkFilter ? (
          <div className="header">
            <Heading className="heading">
              {/* {`${t("titleBlog")} ${}`} */}
              {title}
            </Heading>
          </div>
        ) : (
          <Heading className="heading">
            {/* {`${t("titleBlog")} ${title}`} */}
            {title}
          </Heading>
        )}
        {loading ? (
          <BlogLoading></BlogLoading>
        ) : (
          <>
            {showFilter && (
              <div className="function-filter">
                <div className="filter">
                  <DropDown translate="translate">
                    <DropDown.Select
                      placeholder={selectFilter || `${t("filterNew")}`}
                    ></DropDown.Select>
                    <DropDown.List>
                      {filterOption.map((filter) => (
                        <DropDown.Options
                          key={filter.value}
                          onClick={() => {
                            handleFilter(filter.value);
                            setSelectFilter(filter.name);
                          }}
                        >
                          {filter.name}
                        </DropDown.Options>
                      ))}
                    </DropDown.List>
                  </DropDown>
                </div>
                {showFilter && <></>}
                <div className="filter category-check">
                  <DropDown translate="translate">
                    <DropDown.Select
                      placeholder={
                        nameCategory
                          ? title
                          : selectCategoryFilter || `${t("category")}`
                      }
                    ></DropDown.Select>
                    <DropDown.List>
                      {category.map((category) => (
                        <DropDown.Options
                          key={category?._id}
                          onClick={() => {
                            handleFilter(category?.slug);
                            setSelectCategoryFilter(category?.name);
                          }}
                        >
                          {itemLng === "vn"
                            ? category?.name
                            : category?.nameEN || "none"}
                        </DropDown.Options>
                      ))}
                    </DropDown.List>
                  </DropDown>
                </div>
                <button className="button-filter" onClick={handleClickFilter}>
                  {t("filter")}
                </button>
              </div>
            )}
            <div className="post">
              <div className="post-item">
                {record?.length > 0 &&
                  record?.map((item) => (
                    <PostItem key={item?._id} data={item}></PostItem>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div>
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
              className={`page-item ${
                currentPage === number ? "page-active" : ""
              }`}
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
    </LayoutCategoryStyles>
  );
};

export default LayoutCategory;
