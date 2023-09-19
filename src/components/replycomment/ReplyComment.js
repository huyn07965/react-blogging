import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { baseUrl } from "../../utils/constants";
import { useAuth } from "../../contexts/auth-context";
import { useForm } from "react-hook-form";
import Button from "../button/Button";
import Textarea from "../textarea/Textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IconEdit from "../icon/IconEdit";
import IconDelete from "../icon/IconDelete";
import IconReport from "../icon/IconReport";
import Report from "../report/Report";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const ReplyCommentStyles = styled.div`
  width: 100%;
  .content-comment {
    width: 100%;
  }
  .form {
    width: 100%;
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
  .function {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
    color: ${(props) => props.theme.primary};
  }
`;

const ReplyComment = ({
  userId,
  replyContent,
  postId,
  idReply,
  id,
  idUserReply,
  userPostId,
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
  const navigate = useNavigate();
  const { userInfo, reload, setReload } = useAuth();
  const [user, setUser] = useState();
  const [userReply, setUserReply] = useState();
  const [openRely, setOpenReply] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editComment, setEditComment] = useState(replyContent);
  const [showIconDelete, setShowIconDelete] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [replyComment, setReplyComment] = useState({
    idReply: "",
    idPost: "",
    idUser: "",
    content: "",
    like: "",
  });

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(baseUrl.getUserById + idUserReply)
        .then((result) => {
          setUserReply(result.data.userName);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, [idUserReply]);

  const handleReplyComment = (values) => {
    if (!userInfo) {
      navigate("/sign-in");
    } else if (!values.replyComment) {
      toast.error(`${t("inputComment")}`);
    } else {
      replyComment.idReply = idReply;
      replyComment.idPost = postId;
      replyComment.idUser = userInfo?._id;
      replyComment.idUserReply = userId;
      replyComment.content = values.replyComment;
      axios
        .post(baseUrl.createComment, replyComment)
        .then((result) => {
          reset({
            replyComment: "",
          });
          setOpenReply(false);
          setReload(!reload);
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
      .put(baseUrl.updateComment + id, { content: editComment })
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
            console.log(result);
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
    if (userId === userInfo?._id || userPostId === userInfo?._id) {
      setShowIconDelete(true);
    }
  }, [userId, userPostId, userInfo?._id]);

  useEffect(() => {
    axios
      .get(baseUrl.getUserById + userId)
      .then((result) => {
        setUser(result.data);
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <ReplyCommentStyles>
      <div className="info-user-comment">
        <div className="avatar-comment">
          <img
            className="avatar-image"
            src={user?.avatar}
            alt="avatar comment"
          />
        </div>
        <div className="content-comment">
          <h3>
            {user?.userName} {">"} {userReply}
          </h3>

          <div className="content-comment">{replyContent}</div>
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
            <div
              onClick={() => {
                setOpenEdit(true);
                setOpenReply(false);
              }}
            >
              <IconEdit />
            </div>
            <div
              onClick={() => {
                setShowReport(true);
              }}
            >
              <IconReport />
            </div>
            {showIconDelete && (
              <div onClick={() => handleDelete(id)}>
                <IconDelete />
              </div>
            )}
          </div>
          {openRely && (
            <form className="form" onSubmit={handleSubmit(handleReplyComment)}>
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
          )}
          {openEdit && (
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
          )}
          {/* {dataReply?.length > 0 &&
                dataReply?.map((reply) => <h1>{reply?.content}</h1>)} */}
          <Report
            showReport={showReport}
            setShowReport={setShowReport}
            // idUser={post?.user.id}
            // idPost={post?._id}
          ></Report>
        </div>
      </div>
    </ReplyCommentStyles>
  );
};

export default ReplyComment;
