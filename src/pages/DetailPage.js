import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Comment,
  DetailPageLoading,
  IconComment,
  IconReport,
  IconView,
  Label,
  Layout,
  Report,
  Textarea,
} from "../components";
import {
  PostCategory,
  PostImage,
  PostMeta,
  PostRelated,
  PostTitle,
} from "../module";
import NotFoundPage from "./NotFoundPage";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import Author from "../components/author/Author";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import IconLike from "../components/icon/IconLike";
import { useAuth } from "../contexts/auth-context";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FacebookShareButton, FacebookIcon } from "react-share";
import socketIo from "socket.io-client";
import useLikePost from "../hooks/useLikePost";
import { useTranslation } from "react-i18next";

const DetailPageStyles = styled.div`
  .content-top {
    width: 72%;
    margin: 0 auto;
  }
  .content-bottom {
    width: 72%;
    margin: 0 auto;
  }
  .images {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .title {
    width: 100%;
    margin: 10px auto;
  }
  .content-heading {
    font-size: 36px;
    font-weight: 600;
    line-height: 48px;
    color: ${(props) => props.theme.primary};
    margin: 20px 0;
  }
  .info-post {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  .content-center {
    max-width: 820px;
    margin: 30px auto;
  }
  .content-info {
    font-size: 15px;
    font-weight: 600;
  }
  /* .image-chapter {
    height: 500px;
    border-radius: 20px;
  } */
  /* .image-description {
    display: block;
    text-align: center;
    margin: 20px auto;
    width: 520px;
    font-size: 16px;
    color: ${(props) => props.theme.greyDark};
    font-weight: 300;
  } */
  .comment {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;
  }
  .button-comment {
    width: 180px;
    height: 50px;
    border-radius: 10px;
    color: white;
  }
  .input-comment {
    border-radius: 5px;
    border: 1px solid gray;
    width: 100%;
    height: 200px;
  }
  .title-comment {
    font-size: 25px;
    font-weight: 700;
    color: ${(props) => props.theme.primary};
    margin-bottom: 20px;
  }
  .comment-user {
    width: 100%;
  }
  .sidebar {
    /* width: 50px; */
    height: 100px;
    margin-left: 60px;
    position: fixed;
    top: 37%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
  }
  .show-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .text {
    font-size: 14px;
    color: ${(props) => props.theme.greyDark};
  }
  .border-icon {
    border-radius: 50px;
    padding: 8px;
    color: ${(props) => props.theme.greyDark};
    border: 1px solid ${(props) => props.theme.greyDark};
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  }
  .border-icon:hover {
    background-color: ${(props) => props.theme.primary};
    border: 1px solid ${(props) => props.theme.primary};
    .icon {
      color: white;
    }
  }
  @media screen and (max-width: 1024px) {
    .content-top {
      width: 100%;
    }
    .images {
      width: 100%;
    }
    .content-center {
      margin: 0 auto;
    }
  }
  @media screen and (max-width: 600px) {
    .content-heading {
      font-size: 26px;
      line-height: 38px;
    }
    .content-bottom {
      width: 100%;
    }
  }
`;

const DetailPage = () => {
  const schema = yup.object({
    comment: yup.string().required("Please enter comment"),
  });
  const { userInfo, like, setLike, reload, setReload } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: "",
    },
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPost] = useState();
  const [refresh, setRefresh] = useState(false);
  const [infoComment, setInfoComment] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [totalLike, setTotalLike] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [loading, setLoading] = useState(true);
  const itemLng = localStorage.getItem("lng");

  const [event, setEvent] = useState();
  const socket = useRef(null);

  useEffect(() => {
    socket.current = socketIo("https://node-app-blogging.onrender.com");
    socket.current.on("notification", (notification) => {
      setEvent(notification);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  // const [shareUrl, setShareUrl] = useState("")
  // useEffect(() => {
  //   setShareUrl({`http://localhost:3000/post/${slug}`})
  // },[slug])

  useEffect(() => {
    // setLoading(true);
    async function getData() {
      axios
        .get(baseUrl.getPostDetail + slug)
        .then((result) => {
          setPost(result.data);
          console.log("like", result.data.like);

          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    getData();
  }, [event, slug]);

  const postIdLike = post?._id;
  const postLike = post?.like;
  const userIdPost = post?.user.id;
  const { handleLikePost, likePost } = useLikePost({
    postIdLike,
    postLike,
    userIdPost,
  });

  const [comment, setComment] = useState({
    idReply: "",
    idPost: "",
    idUser: "",
    idUserReply: "",
    content: "",
    like: "",
  });
  const handleComment = async (values) => {
    if (!userInfo) {
      navigate("/sign-in");
    } else {
      comment.idPost = post?._id;
      comment.idUser = userInfo?._id;
      comment.content = values.comment;

      await axios
        .post(baseUrl.createComment, comment)
        .then((result) => {
          // setValues
          reset({
            comment: "",
          });
          setReload(!reload);
          socket.current.emit("newComment", values.comment);
          if (userInfo?._id !== post?.user.id) {
            axios.post(baseUrl.createNotification, {
              UserReceive: post?.user.id,
              userId: userInfo?._id,
              postId: post?._id,
              content: "đã bình luận bài viết của bạn",
              contentEN: "has commented on your post",
              class: "comment",
              seen: false,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleScroll = () => {
    const footer = document.querySelector(".related");
    const footerPosition = footer.getBoundingClientRect().top;

    if (window.scrollY >= footerPosition) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollComment = () => {
    const footer = document.querySelector(".content-bottom");
    footer.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    async function fetchCommentData() {
      await axios
        .get(baseUrl.getComment + post?._id)
        .then((result) => setInfoComment(result.data))
        .catch((err) => console.log(err));
    }
    fetchCommentData();
  }, [post?._id, reload]);

  useEffect(() => {
    function loadFinished() {
      setRefresh(true);
    }
    window.onload = loadFinished;
    if (!refresh) {
      const view = post?.view + 1;
      async function setView() {
        await axios
          .put(baseUrl.updatePost + post?._id, { view })
          .then((result) => console.log("Get data successfully"))
          .catch((err) => console.log(err));
      }
      setView();
    }
  }, [post?._id]);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  useEffect(() => {
    document.title = "Detail Post Page";
  });
  if (!slug) return <NotFoundPage></NotFoundPage>;
  // if (!post.title) return null;
  return (
    <DetailPageStyles>
      <Layout>
        {loading ? (
          <DetailPageLoading></DetailPageLoading>
        ) : (
          <div className="container">
            <div className="content-top">
              <div className="title">
                <PostTitle className="content-heading" to={post?.slug}>
                  {itemLng === "vn" ? post.title : post.titleEN}
                </PostTitle>
                <div className="info-post">
                  <PostCategory
                    to={post?.category?.slug}
                    className="content-newest-top"
                  >
                    {itemLng === "vn"
                      ? post?.category?.name
                      : post?.category?.nameEN}
                  </PostCategory>

                  <PostMeta
                    author={post?.user?.userName}
                    className="content-info"
                    to={slugify(post?.user?.id || "", { lower: true })}
                    date={post?.createdAt}
                  ></PostMeta>
                </div>
              </div>
              <PostImage
                className="images"
                url={post?.image}
                alt="unplash"
              ></PostImage>
            </div>
            <div className="content-center">
              <div
                className="entry-content"
                dangerouslySetInnerHTML={{
                  __html: itemLng === "vn" ? post?.content : post?.contentEN,
                }}
              ></div>
              <Author userId={post?.user?.id}></Author>
            </div>
            {showSidebar && (
              <div className="sidebar">
                <div className="show-icon">
                  <div className="border-icon">
                    <IconView />
                  </div>
                  <p className="text">{post?.view}</p>
                </div>
                <div className="show-icon">
                  <div
                    className="border-icon"
                    // onClick={handleLike}
                  >
                    <IconLike
                      onClick={
                        userInfo
                          ? () => {
                              setLike(!like);
                              handleLikePost();
                            }
                          : () => navigate("/sign-in")
                      }
                      likePost={likePost}
                      data={post?._id}
                    />
                  </div>
                  <p className="text">{totalLike || post?.like}</p>
                </div>

                <div
                  className="border-icon"
                  onClick={() => {
                    setShowReport(true);
                  }}
                >
                  <IconReport />
                </div>
                <div className="border-icon" onClick={handleScrollComment}>
                  <IconComment />
                </div>
                <div>
                  <FacebookShareButton
                    url={`https://react-app-blogging.onrender.com/post/${slug}`}
                    // url="https://vnexpress.net/vietinbank-co-nguoi-phu-trach-ban-dieu-hanh-moi-4646366.html"
                    quote={"Title or jo bhi aapko likhna ho"}
                    // hashtag={"#portfolio..."}
                  >
                    <FacebookIcon size={40} round={true} />
                  </FacebookShareButton>
                </div>
              </div>
            )}

            <div className="related">
              <PostRelated slug={post?.category?.slug}></PostRelated>
            </div>
            <div className="content-bottom">
              <div className="entry-content">
                <Label className="title-comment" htmlFor="comment">
                  {t("commentTit")}
                </Label>
                <form onSubmit={handleSubmit(handleComment)}>
                  <div className="comment">
                    <Textarea
                      name="comment"
                      id="comment"
                      control={control}
                    ></Textarea>
                    <Button
                      type="submit"
                      className="button-comment"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      {t("comment")}
                    </Button>
                  </div>
                </form>
              </div>
              <div className="comment-user">
                <h1 className="title-comment">{t("userComment")}</h1>
                {infoComment?.map((comment) => (
                  <Comment
                    key={comment?._id}
                    userId={comment.idUser}
                    postId={comment.idPost}
                    infoComment={comment.content}
                    idComment={comment._id}
                    userPostId={post?.user.id}
                    likeCmt={comment?.like}
                  ></Comment>
                ))}
              </div>
            </div>
          </div>
        )}
        <Report
          showReport={showReport}
          setShowReport={setShowReport}
          idUser={post?.user.id}
          idPost={post?._id}
        ></Report>
      </Layout>
    </DetailPageStyles>
  );
};

export default DetailPage;
