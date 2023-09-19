import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import axios from "axios";
import styled from "styled-components";
import { baseUrl } from "../../utils/constants";
import ReplyComment from "../replycomment/ReplyComment";
import Button from "../button/Button";
import { useForm } from "react-hook-form";
import Textarea from "../textarea/Textarea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IconEdit from "../icon/IconEdit";
import IconDelete from "../icon/IconDelete";
import IconReport from "../icon/IconReport";
import Report from "../report/Report";
import Swal from "sweetalert2";
import IconLikeComment from "../icon/IconLikeComment";
import useLikeComment from "../../hooks/useLikeComment";
import { useTranslation } from "react-i18next";

const CommentStyles = styled.div`
  .content-comment {
    width: 100%;
  }
  .comment {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;
  }
  .button-comment {
    width: 150px;
    height: 50px;
    border-radius: 10px;
    color: white;
  }
  .input-comment {
    border-radius: 5px;
    border: 1px solid gray;
    width: 500px;
    height: 200px;
  }
  .avatar-comment {
    min-width: 40px;
    min-height: 40px;
    max-width: 40px;
    max-height: 40px;
    border-radius: 40px;
  }
  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 40px;
  }
  .info-user-comment {
    display: flex;
    align-items: start;
    gap: 10px;
  }
  .reply {
    cursor: pointer;
    font-size: 16px;
  }
  .form {
    width: 100%;
  }
  .reply-user {
    width: 100%;
  }
  .function {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
    color: ${(props) => props.theme.primary};
  }
  .icon {
    cursor: pointer;
  }
`;
// const schema = yup.object({
//   replyComment: yup.string().required("Please enter comment"),
// });
const Comment = ({
  userId,
  postId,
  infoComment,
  idComment,
  userPostId,
  likeCmt,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      replyComment: "",
    },
  });
  const { t } = useTranslation();
  const { userInfo, reload, setReload } = useAuth();
  const [user, setUser] = useState();
  const [openRely, setOpenReply] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editComment, setEditComment] = useState(infoComment);
  const navigate = useNavigate();
  const [showIconDelete, setShowIconDelete] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [like, setLike] = useState(false);

  //   const [reload, setReload] = useState(false);
  const [replyComment, setReplyComment] = useState({
    idReply: "",
    idPost: "",
    idUser: "",
    idUserReply: "",
    content: "",
    like: "",
  });
  const [dataReply, setDataReply] = useState();
  const { handleLikeComment, likeComment } = useLikeComment({
    idComment,
    likeCmt,
  });

  const handleReplyComment = async (values) => {
    if (!userInfo) {
      navigate("/sign-in");
    } else if (!values.replyComment) {
      toast.error(`${t("inputComment")}`);
    } else {
      replyComment.idPost = postId;
      replyComment.idUser = userInfo?._id;
      replyComment.idUserReply = userId;
      replyComment.idReply = idComment;
      replyComment.content = values.replyComment;
      await axios
        .post(baseUrl.createComment, replyComment)
        .then((result) => {
          reset({
            replyComment: "",
          });
          setReload(!reload);
          setOpenReply(false);
          if (userInfo?._id !== userId) {
            axios.post(baseUrl.createNotification, {
              UserReceive: userId,
              userId: userInfo?._id,
              postId: postId,
              content: "đã trả lời bình luận bài viết của bạn",
              contentEN: "has replied to a comment on your post",
              class: "comment",
              seen: false,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEditComment = () => {
    axios
      .put(baseUrl.updateComment + idComment, {
        content: editComment,
      })
      .then((result) => {
        console.log(result);
        setReload(!reload);
        setOpenEdit(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .delete(baseUrl.deleteComment + id)
          .then((result) => {
            setReload(!reload);
            setOpenEdit(false);
            setOpenReply(false);
            Swal.fire("Deleted!", "Comment has been deleted.", "success");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // set show icon
  useEffect(() => {
    if (
      userId === userInfo?._id ||
      userPostId === userInfo?._id ||
      userInfo?.role === 1
    ) {
      setShowIconDelete(true);
    }
  }, [userId, userPostId, userInfo?._id]);

  useEffect(() => {
    axios
      .get(baseUrl.getUserById + userId)
      .then((result) => setUser(result.data))
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    axios
      .get(baseUrl.getReplyComment + idComment)
      .then((result) => setDataReply(result.data))
      .catch((err) => console.log(err));
  }, [idComment, reload]);

  return (
    <CommentStyles>
      <div className="info-user-comment">
        <div className="avatar-comment">
          <img
            className="avatar-image"
            src={user?.avatar}
            alt="avatar comment"
          />
        </div>
        <div className="content-comment">
          <h3>{user?.userName}</h3>
          <div className="content-comment">{infoComment}</div>
          <div className="function">
            <p
              className="reply"
              onClick={() => {
                setOpenReply(true);
                setOpenEdit(false);
              }}
            >
              {t("reply")}
            </p>
            <div>
              <IconLikeComment
                onClick={
                  userInfo
                    ? () => handleLikeComment()
                    : () => navigate("/sign-in")
                }
                likeComment={likeComment}
                data={idComment}
              />
              {/* <IconLike
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
                    /> */}
            </div>
            <div
              className="icon"
              onClick={() => {
                setOpenEdit(true);
                setOpenReply(false);
              }}
            >
              <IconEdit />
            </div>
            <div
              className="icon"
              onClick={() => {
                setShowReport(true);
              }}
            >
              <IconReport />
            </div>
            {showIconDelete && (
              <div onClick={() => handleDelete(idComment)}>
                <IconDelete />
              </div>
            )}
          </div>
          {openRely && (
            <div className="entry-content">
              <div className="comment">
                <form
                  className="form"
                  onSubmit={handleSubmit(handleReplyComment)}
                >
                  <Textarea
                    name="replyComment"
                    id="replyComment"
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
                </form>
              </div>
            </div>
          )}
          {openEdit && (
            <div>
              <form className="form" onSubmit={handleSubmit(handleEditComment)}>
                <Textarea
                  name="editComment"
                  id="editComment"
                  control={control}
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                ></Textarea>
                <Button
                  type="submit"
                  className="button-comment"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {t("comment")}
                </Button>
              </form>
            </div>
          )}
          <div className="reply-user">
            {dataReply?.length > 0 &&
              dataReply?.map((reply) => (
                <ReplyComment
                  userId={reply?.idUser}
                  idUserReply={reply?.idUserReply}
                  replyContent={reply?.content}
                  idReply={idComment}
                  id={reply?._id}
                  postId={postId}
                  userPostId={userPostId}
                ></ReplyComment>
              ))}
          </div>
          <Report
            showReport={showReport}
            setShowReport={setShowReport}
            idUser={userId}
            idPost={postId}
            idComment={idComment}
          ></Report>
        </div>
      </div>
    </CommentStyles>
  );
};

export default Comment;
