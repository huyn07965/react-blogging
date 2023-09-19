import React, { useState } from "react";
import ActionEdit from "../action/ActionEdit";
import ActionDelete from "../action/ActionDelete";
import ActionView from "../action/ActionView";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LabelStatus from "../label/LabelStatus";
import { useAuth } from "../../contexts/auth-context";
import { roleStatus } from "../../utils/constants";
import axios from "axios";

const PostList = ({ post, admin = false, onChange, urlDeletePost }) => {
  const itemLng = localStorage.getItem("lng");

  const [reload, setReload] = useState(false);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const date = post?.createdAt?.seconds
    ? new Date(post?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
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
          .delete(urlDeletePost + id)
          .then((result) => {
            Swal.fire("Deleted!", "Post has been deleted.", "success");
            setReload(!reload);
            onChange(!reload);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return <LabelStatus type="success">Active</LabelStatus>;
      case 2:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case 3:
        return <LabelStatus type="danger">Reject</LabelStatus>;
      default:
        break;
    }
  };
  return (
    <tr key={post?._id}>
      <td title={post?._id}>{post._id?.slice(0, 5) + "..."}</td>
      <td>
        <div className="item-post">
          <img src={post?.image} alt="" className="img-post" />
          <div className="item-post-info">
            <h3
              className="item-post-name"
              title={itemLng === "vn" ? post?.title : post?.titleEN}
            >
              {itemLng === "vn"
                ? post.title?.slice(0, 30) + "..."
                : post.titleEN?.slice(0, 30) + "..."}
            </h3>
            <time className="item-post-description">Date: {formatDate}</time>
          </div>
        </div>
      </td>
      <td>
        <span className="item-post-description">
          {itemLng === "vn"
            ? post.category?.name
            : post.category?.nameEN || "none"}
        </span>
      </td>
      <td>
        <span className="item-post-description">{post.user?.userName}</span>
      </td>
      <td>{renderStatus(Number(post?.status))}</td>
      <td>
        <div className="actions">
          <ActionView
            onClick={() => navigate(`/post/${post.slug}`)}
          ></ActionView>
          {userInfo?.role == roleStatus.Admin ? (
            <ActionEdit
              onClick={() => navigate(`/manage/update-post?id=${post._id}`)}
            ></ActionEdit>
          ) : (
            <ActionEdit
              onClick={() => navigate(`/user/update-post?id=${post._id}`)}
            ></ActionEdit>
          )}

          <ActionDelete onClick={() => handleDelete(post._id)}></ActionDelete>
        </div>
      </td>
    </tr>
  );
};

export default PostList;
